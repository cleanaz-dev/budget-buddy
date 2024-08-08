import { Nunito } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { AtomIcon, BookHeart, HomeIcon, Menu, MenuIcon, MenuSquare, Settings2Icon } from "lucide-react";
import { Button } from "../components/ui/button";

import {
 Sheet,
 SheetClose,
 SheetContent,
 SheetDescription,
 SheetFooter,
 SheetHeader,
 SheetTitle,
 SheetTrigger,
} from "../components/ui/sheet";
import Link from "next/link";

const inter = Nunito({ subsets: ["latin"] });

const menuNav = [
  { label: "Home", href: "/home", icon: <HomeIcon /> },
  { label: "Settings", href: "/settings", icon: <Settings2Icon /> },
  { label: "AI", href: "/data", icon: <AtomIcon /> },
  { label: "Archive", href: "/archive", icon: <BookHeart /> },
 ];


export const metadata = {
 title: "Budget Buddy",
 description: "Budget your finances with the help from AI",
};

export default function RootLayout({ children }) {
 return (
  <ClerkProvider>
   <html lang="en">
    <body className={inter.className}>
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
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription >
           <p className="mb-10">Please select from one of the options:</p>
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

     <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
