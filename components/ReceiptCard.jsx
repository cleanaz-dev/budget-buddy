"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { getAllReceipts } from "../lib/actions";
import Link from "next/link";
import { PinRightIcon } from "@radix-ui/react-icons";
import { ArrowRight } from "lucide-react";

export default function ReceiptCard() {
 const [receipts, setReceipts] = useState([]);
 const [receiptSum, setReceiptSum] = useState(0);
 useEffect(() => {
  const fetchReceipts = async () => {
   try {
    // Assume getAllReceipts is an asynchronous function that retrieves receipts
    const fetchedReceipts = await getAllReceipts();
    // console.log(fetchedReceipts);
    setReceipts(fetchedReceipts);
   } catch (error) {
    console.error("Error fetching receipts:", error);
   }
  };

  fetchReceipts();
 }, []);
 // Calculate sum on component mount or when receipts change
 // Calculate sum and formatted sum on component mount or when receipts change
 useEffect(() => {
  // Handle potential errors or empty receipts array gracefully
  if (!receipts || receipts.length === 0) {
   setReceiptSum(0); // Set sum to 0 if no receipts
   return;
  }

  const sum = receipts.reduce((acc, receipt) => {
   // Parse the total into a number directly
   return acc + parseFloat(receipt.total.replace(/[^0-9.]/g, ""));
  }, 0); // Initial accumulator as 0

  // Format the sum with two decimal places directly
  const formattedReceiptSum = parseFloat(sum.toFixed(2));

  setReceiptSum(formattedReceiptSum); // Use formatted sum
 }, [receipts]);

 return (
  <div>
   <main className="flex-col p-6 md:p-10">
    <div className="mb-6 flex items-center justify-between">
     <div className="flex flex-col ">
      <h1 className="text-2xl font-bold text-muted-foreground px-5 ">
       Expense Receipts (Total: ${receiptSum?.toFixed(2)})
      </h1>
      
       <p className="text-center items-center px-5 text-muted-foreground">
       Analyze your data with Budget Buddy?
       </p>
     <div className="items-center justify-center text-center">
     <Button variant="ghost" asChild> 
     <Link href={"/data"} className="underline font-semibold">Yes Please!</Link></Button>
     </div>
     </div>
    </div>
    <div className="flex flex-col gap-x-4 gap-y-4">
     {receipts?.map((receipt) => (
      <Card key={receipt.id}>
       {" "}
       {/* Assuming each receipt has a unique identifier */}
       <CardHeader>
        <div className="flex items-center justify-between">
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {receipt.date}
         </span>
         <p className="bg-green-100 inline-flex py-0.5 px-2 rounded-full text- text-muted-foreground text-xs mb-2">
          {receipt.paymentType}
         </p>
         <Badge variant="success">{receipt.category}</Badge>
        </div>
       </CardHeader>
       <CardContent>
        <h3 className="text-lg font-medium">{receipt.location}</h3>

        <p className="text-gray-500 dark:text-gray-400">
         {receipt.description}
        </p>
       </CardContent>
       <CardFooter>
        <div className="flex items-center justify-between mb-2">
         <span className="text-lg font-medium">{receipt.total}</span>

         <Button size="sm" variant="outline" className="ml-2" asChild>
          <Link href={receipt.imgUrl}>View</Link>
         </Button>
         <Button size="sm" variant="secondary" className="ml-2">
          Edit
         </Button>
        </div>
       </CardFooter>
      </Card>
     ))}
    </div>
   </main>
   {/* <aside className="hidden w-72 border-l bg-gray-100 p-6 md:block dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-bold">Total Expenses</h2>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-medium">$2,345.00</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Tax</span>
            <span className="font-medium">$187.60</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between font-medium">
            <span>Total</span>
            <span>$2,532.60</span>
          </div>
        </div>
      </aside> */}
  </div>
 );
}
