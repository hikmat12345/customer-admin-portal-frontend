'use client';

import React, { useEffect, useRef, useState } from 'react';

interface ScrollTabsProps {
  children: React.ReactNode;
  tabs: string[];
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({ children, tabs = [''] }) => {
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
      <ul className="inline-flex h-[19px] w-[828px] flex-wrap items-start justify-start gap-[30px] pb-12 max-lg:mb-5 max-lg:w-[100%] max-lg:gap-[5px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-2 py-1 font-normal capitalize text-zinc-600 lg:text-[13px] xl:text-[14px] ${activeTab === tab ? 'active-tab' : ''}`}
            onClick={() => scrollToSection(tab)}
          >
            {tab.replaceAll('-', ' ')}
          </button>
        ))}
      </ul>
      <div className="relative mt-2 h-[75vh] overflow-y-scroll rounded-lg border border-neutral-300 p-5">
        {children}
      </div>
    </div>
  );
};

export default ScrollTabs;
