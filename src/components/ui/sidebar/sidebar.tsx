import { useRef } from "react";
import ScrollArea from "@veroxos/design-system/dist/ui/ScrollArea/scroll-area";
import { Separator } from "../separator";
import SidebarItem from "./sidebarItem";
import Image from "next/image";
import httpClient from "@/services/httpClient";

interface ISidebarItem {
  name: string;
  path: string;
  src: string;
  items?: ISubItem[];
}

interface ISubItem {
  name: string;
  path: string;
}

const menuItems: ISidebarItem[] = [
  {
    name: "Home",
    path: "/",
    src: "/svg/sidebar/home.svg",
  },
  {
    name: "Support",
    path: "/support",
    src: "/svg/sidebar/support.svg",
    items: [
      {
        name: "Veroxos Support",
        path: "support/veroxos-support",
      },
      {
        name: "View Tickets",
        path: "/support/tickets",
      },
    ],
  },
  {
    name: "Accounts",
    path: "/accounts",
    src: "/svg/sidebar/accounts.svg",
    items: [
      {
        name: "View Invoices",
        path: "/accounts/invoices",
      },
    ],
  },
  {
    name: "Inventory",
    path: "/inventory",
    src: "/svg/sidebar/inventory.svg",
  },
  {
    name: "Reporting",
    path: "/reporting",
    src: "/svg/sidebar/reporting.svg",
    items: [
      {
        name: "Reports",
        path: "/reporting/reports",
      },
    ],
  },
  {
    name: "Optimization",
    path: "/optimization",
    src: "/svg/sidebar/optimization.svg",
  },
];

const supportItems = [
  {
    name: "Knowledge Base",
    path: "/knowledge-base",
    src: "/svg/sidebar/knowledgeBase.svg",
  },
  {
    name: "Chat",
    path: "/chat",
    src: "/svg/sidebar/chat.svg",
  },
  {
    name: "Veroxos Support",
    path: "/veroxos-support",
    src: "/svg/sidebar/veroxosSupport.svg",
  },
];

const otherItems: any = [];

const Sidebar = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToItem = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const onClickLogout = async () => {
    const response = await httpClient.post("/api/logout", {});
    window.location.href = response.data.redirectUrl;
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[280px] lg:w-[250px] bg-[#1D46F3] shadow-lg z-10 px-4 py-[8px]">
      <div className="relative flex flex-col justify-between px-5 h-full">
        <div className="flex flex-col space-y-3 w-full">
          <Image
            src="/svg/logo.svg"
            height={80}
            width={200}
            alt="Logo image"
            style={{ margin: "auto" }}
            loading="lazy"
          />
          <h2 className="uppercase text-[#FFFFFF] text-sm pb-1">Menu</h2>
          <ScrollArea className="h-auto lg:h-[210px] xl:min-h-[450px]">
            <div className="flex flex-col space-y-1">
              {menuItems.map((item, index) => (
                <SidebarItem
                  key={index}
                  data={item}
                  scrollToItem={scrollToItem}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        <div className="flex flex-col gap-10 pb-4">
          <div className="relative">
            <h2 className="uppercase text-[#FFFFFF] text-sm pb-3">Support</h2>
            {supportItems.map((item, index) => (
              <SidebarItem
                key={index}
                data={item}
                scrollToItem={scrollToItem}
              />
            ))}
            <div className="absolute w-full mt-3 mb-3">
              <Separator />
            </div>
          </div>

          <div className="relative">
            <h2 className="uppercase text-[#FFFFFF] text-sm pb-3">Other</h2>
            {otherItems?.map((item: any, index: number) => (
              <SidebarItem
                key={index}
                data={item}
                scrollToItem={scrollToItem}
              />
            ))}
            <div
              onClick={onClickLogout}
              className="p-2 rounded-lg font-normal hover:bg-[#FFFFFF4D] w-full text-start flex items-center justify-start text-sm text-[#CBE0FF] space-x-2 cursor-pointer"
            >
              <Image
                src={"/svg/sidebar/logout.svg"}
                height={16}
                width={16}
                alt="icons"
              />
              <span>Log Out</span>
            </div>
            <div className="absolute w-full mt-3 left-0">
              <Separator />
            </div>
          </div>
          <h2 className="text-[#FFFFFF] text-sm text-center font-normal">
            Powered by Veroxos
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
