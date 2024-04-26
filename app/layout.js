import { Nunito } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ClerkProvider, SignedIn, UserButton } from "@clerk/nextjs";
import { Menu, MenuSquare } from "lucide-react";
import { Button } from "../components/ui/button";

const inter = Nunito({ subsets: ["latin"] });

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
      <div className="top-0 left-0 absolute p-4">
       <UserButton showName={true} />
      </div>
      <div className="top-0 right-0 absolute p-4 rounded-full mr-1  hover:bg-green-100">
       
        <Menu />
      
      </div>
     </SignedIn>
     <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
