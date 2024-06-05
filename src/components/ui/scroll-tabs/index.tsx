"use client"

import React from "react";

export const ScrollTabs = ({ children, tabs = [""] }: { children: React.ReactNode, tabs: string[] }) => {
    const [isActive, setActive] = React.useState(tabs[0]);

    // Function to handle scrolling to the top of a section
    const scrollToSection = (id: string) => {
        const section = document.getElementById(id);
        if (section) {
            setActive(id)
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
     <div>
        <ul className='w-[828px] max-lg:w-[100%]  h-[19px] justify-start items-start gap-[30px] max-lg:gap-[5px] max-lg:mb-5 flex-wrap inline-flex pb-12'>
            {tabs.map((tab, index) => (
                <button key={index} className={`py-1 px-2 text-zinc-600 lg:text-[13px] xl:text-[14px] font-normal capitalize ${isActive === tab && 'active-tab'}`} onClick={() => scrollToSection(tab)}>{
                    tab.replaceAll( '-', ' ')
                }</button>
            ))}
        </ul>
        <div className='mt-2 rounded-lg border border-neutral-300 p-5  overflow-y-scroll h-[75vh] relative'>
            {children}
        </div>
     </div>
    )
}