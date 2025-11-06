'use client';

import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/utils';
import TabsList from '@veroxos/design-system/dist/ui/TabsList/tabsList';
import Tabs from '@veroxos/design-system/dist/ui/Tabs/tabs';
import TabsTrigger from '@veroxos/design-system/dist/ui/TabsTrigger/tabsTrigger';
import Image from 'next/image';

interface ScrollTabsProps {
  children: React.ReactNode;
  tabs: string[];
  rightText?: string;
  page?: string;
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({ children, tabs = [''], rightText, page }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const observer = useRef<IntersectionObserver | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>(
    tabs.reduce((acc, tab) => ({ ...acc, [tab]: null }), {}),
  );
  const isManualScroll = useRef(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const sections = tabs.map((tab) => document.getElementById(tab));

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      if (isManualScroll.current) return;

      entries.forEach((entry) => {
        const { isIntersecting, target } = entry;
        if (isIntersecting) {
          setActiveTab(target.id);
          // highlightObservedSection(target.id);
        }
      });
    };

    const root = scrollContainerRef.current;
    observer.current = new IntersectionObserver(handleIntersect, {
      root: root,
      rootMargin: `0px 0px -300px 0px`, // Adjust as needed
      threshold: 0.5,
    });

    Object.values(sectionRefs.current).forEach((section) => {
      if (section) {
        observer.current?.observe(section);
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [tabs]);

  const scrollToSection = (id: string) => {
    const section = sectionRefs.current[id];
    if (section) {
      isManualScroll.current = true;
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });

      setTimeout(() => {
        isManualScroll.current = false;
      }, 500);
    } else {
      console.error(`Section with id ${id} not found.`);
    }
  };

  const highlightObservedSection = (id: string) => {
    Object.keys(sectionRefs.current).forEach((key) => {
      const section = sectionRefs.current[key];
      if (section) {
        // section.style.backgroundColor = key === id ? 'rgba(255, 255, 0, 0.3)' : '';     // Keeping this for debugging purposes to highlight the observed block
      }
    });
  };

  return (
    <div>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div
          className={`${rightText ? 'flex w-full justify-between' : 'sm:flex 2md:block 2md:w-[65%] lg:w-[70%]'} " sm:w-full sm:gap-[1rem] 2md:gap-[2rem]`}
        >
          <TabsList className="sm:mb-[35px] sm:block sm:w-full sm:gap-[1rem] 2md:block 2md:w-[85%] 2md:gap-[2rem] lg:mb-[30px] lg:block 2lg:mb-[30px] 2lg:w-[100%]">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={tab}
                className={cn(
                  'mr-3 px-2 py-1 font-normal capitalize text-zinc-600 lg:text-[13px] xl:text-[14px]',
                  activeTab === tab ? 'active-tab' : '',
                )}
                onClick={() => scrollToSection(tab)}
              >
                {tab.replaceAll('-', ' ')}
              </TabsTrigger>
            ))}
          </TabsList>
          {rightText && (
            <div className="flex w-[220px] items-start justify-center gap-3">
              <div className="flex items-center justify-center">
                <Image src={'/svg/notepad.svg'} alt="invoice icon" width={24} height={24} />
                <p className="ml-2 text-[16px] font-normal text-custom-blue">Invoice ID.</p>
              </div>
              <div className="text-[16px] font-normal text-custom-black">{rightText}</div>
            </div>
          )}
        </div>
        <div
          ref={scrollContainerRef}
          className="relative mt-2 h-[75vh] overflow-y-scroll rounded-lg border border-neutral-300 p-5"
        >
          <div
            style={{
              position: 'absolute',
              top: '100px',
              width: '100%',
              zIndex: -1,
            }}
          />
          {tabs.map((tab, index) => (
            <div id={tab} key={index} ref={(el) => (sectionRefs.current[tab] = el) as any}>
              {React.Children.toArray(children)[index]}
            </div>
          ))}
        </div>
      </Tabs>
    </div>
  );
};
export default ScrollTabs;
