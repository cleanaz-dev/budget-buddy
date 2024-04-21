import { Nunito } from "next/font/google";
import "./globals.css";
import { EdgeStoreProvider } from "../lib/edgestore";
import { ClerkProvider } from "@clerk/nextjs";

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
     <EdgeStoreProvider>{children}</EdgeStoreProvider>
    </body>
   </html>
  </ClerkProvider>
 );
}
