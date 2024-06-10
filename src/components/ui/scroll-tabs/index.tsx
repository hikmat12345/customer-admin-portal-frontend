"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ScrollTabsProps {
  children: React.ReactNode;
  tabs: string[];
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({ children, tabs = [""] }) => {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      threshold: 0.7, // Adjust the threshold as needed
    });

    tabs.forEach((tab) => {
      const section = document.getElementById(tab);
      if (section) {
        observer.current?.observe(section);
      }
    });

    return () => {
      observer.current?.disconnect();
    };
  }, [tabs]);

const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveTab(id);
    }
};

return (
    <div>
        <ul className='w-[828px] max-lg:w-[100%]  h-[19px] justify-start items-start gap-[30px] max-lg:gap-[5px] max-lg:mb-5 flex-wrap inline-flex pb-12'>
            {tabs.map((tab, index) => (
                <button key={index} className={`py-1 px-2 text-zinc-600 lg:text-[13px] xl:text-[14px] font-normal capitalize ${activeTab === tab ? 'active-tab' : ''}`}
                    onClick={() => scrollToSection(tab)}>
                    {tab.replaceAll('-', ' ')}
                </button>
            ))}
        </ul> 
        <div className='mt-2 rounded-lg border border-neutral-300 p-5  overflow-y-scroll h-[75vh] relative'>
            {children}
        </div>
    </div> 
);
};

export default ScrollTabs;
