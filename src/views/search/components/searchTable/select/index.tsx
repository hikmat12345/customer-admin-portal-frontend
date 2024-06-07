"use client";
import React from "react";
import Popover from "@veroxos/design-system/dist/ui/PopOver/popover";
import PopoverTrigger from "@veroxos/design-system/dist/ui/PopoverTrigger/popoverTrigger";
import PopoverContent from "@veroxos/design-system/dist/ui/PopoverContent/popoverContent";
import Command from "@veroxos/design-system/dist/ui/Command/command";
import CommandGroup from "@veroxos/design-system/dist/ui/CommandGroup/commandGroup";
import CommandList from "@veroxos/design-system/dist/ui/CommandList/commandList";
import CommandItem from "@veroxos/design-system/dist/ui/CommandItem/commandItem";
import Image from "next/image";
import { Button } from "@veroxos/design-system/dist/ui/Button/button";
import { FILTERS } from "./options";
interface IProps {
  selectedFilters: string[];
  setSelectedFilters: (filters: string[]) => void;
}
const SelectComponent = (props: IProps) => {
  const { selectedFilters, setSelectedFilters } = props;
  const [open, setOpen] = React.useState(false);
  const handleOnSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedFilters = selectedFilters.includes(value)
      ? selectedFilters.filter((filter) => filter !== value)
      : [...selectedFilters, value];
    setSelectedFilters(updatedFilters);
  };
  const resetFilters = () => {
    setSelectedFilters([]);
    setOpen(false);
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        asChild
        className="bg-custom-blue outline-none flex flex-row items-center"
      >
        <Button
          variant="primary"
          role="combobox"
          aria-expanded={open}
          className="w-auto justify-between"
          value={12}
        >
          <Image
            src={"/svg/search/filter.svg"}
            alt="Chevron Icon"
            width={20}
            height={20}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandGroup>
            <div className="border-b">
              <h6 className="text-custom-slate-700 text-sm font-bold px-1 py-2">
                Filters
              </h6>
            </div>
          </CommandGroup>
          <CommandGroup>
            <CommandList>
              {FILTERS.map((f: any) => (
                <label htmlFor={f.id} className="text-slate-700" key={f.id}>
                  <CommandItem key={f.id} value={f.name}>
                    <input
                      type="checkbox"
                      name={f.name}
                      id={f.id}
                      className="mr-2"
                      value={f.name}
                      checked={selectedFilters.includes(f.name)}
                      onChange={handleOnSelect}
                    />
                    {f.label}
                  </CommandItem>
                </label>
              ))}
            </CommandList>
          </CommandGroup>
          <CommandGroup>
            <div className="border-t py-2 text-center">
              <Button
                className="text-slate-700 text-sm font-bold bg-transparent"
                onClick={resetFilters}
              >
                <Image
                  src={"/svg/timer-reset.svg"}
                  height={14}
                  width={14}
                  alt=""
                />
                <span className="text-sm">Reset</span>
              </Button>
            </div>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
export default SelectComponent;
