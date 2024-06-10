'use client';

import React from 'react';

export function ScrollTabs({ children, tabs = [''] }: { children: React.ReactNode; tabs: string[] }) {
  const [isActive, setActive] = React.useState(tabs[0]);

  // Function to handle scrolling to the top of a section
  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      setActive(id);
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  return (
    <div>
      <ul className="inline-flex h-[19px] w-[828px] flex-wrap items-start justify-start gap-[30px] pb-12 max-lg:mb-5 max-lg:w-[100%] max-lg:gap-[5px]">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`px-2 py-1 font-normal capitalize text-zinc-600 lg:text-[13px] xl:text-[14px] ${isActive === tab && 'active-tab'}`}
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
}
