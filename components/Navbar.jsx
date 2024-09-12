import React from 'react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
 } from "../components/ui/select";
 import { AtomIcon, BookHeart, HomeIcon, Menu, MenuIcon, MenuSquare, Settings2Icon } from "lucide-react";
 import { Button } from "../components/ui/button";
 import Link from "next/link";
 import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";

 const menuNav = [
  { label: "Home", href: "/home", icon: <HomeIcon /> },
  { label: "Settings", href: "/settings", icon: <Settings2Icon /> },
  { label: "AI", href: "/data", icon: <AtomIcon /> },
  { label: "Archive", href: "/archive", icon: <BookHeart /> },
 ];


export default function Navbar() {
  return (
    <>
      <SignedIn>
      <div className="top-0 right-0 absolute p-4">
       <UserButton showName={true} />
      </div>

      <div className="top-0 left-0 absolute p-4">
       <Sheet >
        <SheetTrigger>
          <Button size="icon" variant="secondary" asChild>
            <MenuIcon className="text-slate-300 p-1"/>
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[250px]" side="left">
         <SheetHeader>
          <SheetTitle><h1 className='text-white'>Menu</h1></SheetTitle>
          <SheetDescription >
           <p className="mb-10 text-white">Please select from one of the options:</p>
          </SheetDescription>
         </SheetHeader>
         <div className="flex flex-col">
         {menuNav.map((item) => (
          
          <SheetClose asChild>
           
           <Link key={item.label} href={item.href}>
            <p className="flex gap-2 mb-4 hover:bg-slate-50 hover:text-green-400 transition-all duration-300 p-2.5">{item.icon} {item.label}</p>
           </Link>
           
           </SheetClose>
         ))}
         </div>
        </SheetContent>
       </Sheet>
      </div>
     </SignedIn>
    </>
  )
}
