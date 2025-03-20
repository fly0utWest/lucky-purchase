import React from "react";
import { Separator } from "./ui/separator";
import { SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import Logo from "./logo";

const Header = () => {
  return (
    <nav className="sticky top-0 flex justify-between h-16 shrink-0 items-center gap-2 border-b bg-muted px-4">
      <div className="flex items-center">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <span className="font-semibold">Меню</span>
      </div>
      <div>
        <Link href="/" className="text-lg text-primary font-bold">
          <Logo mobile/>
        </Link>
      </div>
    </nav>
  );
};

export default Header;
