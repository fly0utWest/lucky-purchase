import React from "react";
import { Separator } from "./ui/separator";
import SidebarTrigger from "./SidebarTrigger";

const header = () => {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
    <div className="flex items-center gap-2 px-3">
      <SidebarTrigger />
      <Separator orientation="vertical" className="mr-2 h-4" />
      
    </div>
  </header>
  );
};

export default header;
