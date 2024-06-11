'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';

interface ScrollTabsProps {
  children: React.ReactNode;
  tabs: string[];
  rightText?: string 
}

export const ScrollTabs: React.FC<ScrollTabsProps> = ({ children, tabs = [''] , rightText }) => {
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
      <div className="flex justify-between items-center">
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
      <div className="flex gap-2 py-2">
        <div className="flex items-center">
          <Image src={'/svg/notepad.svg'} alt="invoice icon" width={24} height={24} />
          <p className="ml-3 text-[16px] font-normal text-custom-blue">Invoice ID.</p>
        </div>
        <span className="text-[16px] font-normal text-custom-black">{rightText}</span>
      </div>
      </div>
      <div className="relative mt-2 h-[75vh] overflow-y-scroll rounded-lg border border-neutral-300 p-5">
        {children}
      </div>
    </div>
  );
};

export default ScrollTabs;
