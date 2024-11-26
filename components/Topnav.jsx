import React from "react";
import {
 Sheet,
 SheetContent,
 SheetHeader,
 SheetClose,
 SheetFooter,
 SheetTrigger,
 SheetPortal,
 SheetTitle,
 SheetDescription,
} from "./ui/sheet";
import Link from "next/link";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import {
 AtomIcon,
 BookHeart,
 HomeIcon,
 Menu,
 MenuIcon,
 MenuSquare,
 Settings2Icon,
} from "lucide-react";
import { Button } from "./ui/button";

const menuNav = [
 { label: "Home", href: "/home", icon: <HomeIcon /> },
 { label: "AI", href: "/data", icon: <AtomIcon /> },
 { label: "Archive", href: "/archive", icon: <BookHeart /> },
 { label: "Settings", href: "/settings", icon: <Settings2Icon /> },
];
export default function Topnav() {
  return (
    <div className="bg-slate-200 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="max-w-3xl mx-auto flex items-center justify-between p-3">
        <div className="p-1">
          <UserButton />
        </div>
        <div>Budget Buddy</div>
        <div>
          <Sheet>
            <SheetTrigger>
              <Button size="icon" variant="secondary" className="hover:bg-slate-600 hover:text-green-400 transition-colors duration-300" asChild>
                <MenuIcon className="text-slate-300 p-1" />
              </Button>
            </SheetTrigger>
            <SheetContent className="" side="top">
              <SheetHeader>
                <SheetTitle><span className="text-white">Menu</span></SheetTitle>
                <SheetDescription>
                  <p className="mb-10 text-white">Please select from one of the options:</p>
                </SheetDescription>
              </SheetHeader>
              <div className="flex flex-col ">
                {menuNav.map((item) => (
                  <SheetClose key={item.label} asChild>
                    <Link href={item.href}>
                      <p className="inline-flex gap-2 mb-4 hover:bg-slate-600/50 hover:text-green-400 transition-all duration-300 p-2.5 w-36 rounded-xl">
                        {item.icon} {item.label}
                      </p>
                    </Link>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

