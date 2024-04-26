"use client";

import React, { useEffect, useState } from "react";

import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import { getAllReceipts, getUserReceipts } from "../lib/actions";
import Link from "next/link";
import { ArrowBigDown, ArrowBigDownIcon, ArrowDown } from "lucide-react";

export default function ReceiptCard(props) {
 const { clerkId, userEmail } = props;

 const [receipts, setReceipts] = useState([]);
 const [receiptSum, setReceiptSum] = useState(0);
 useEffect(() => {
  const fetchReceipts = async () => {
   try {
    // Assume getAllReceipts is an asynchronous function that retrieves receipts
    const fetchedReceipts = await getUserReceipts(clerkId);
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
 
 const userBudget = 300
 const remainingBudget = userBudget - receiptSum
 return (
  <div>
   <main className="flex-col p-6 md:p-10">
    <div className="mb-6 flex items-center justify-between">
     <div className="flex flex-col ">
    
      <h1 className="text-xl md:text-2xl f text-muted-foreground px-5 ">
       Expense Receipts: (Spending: ${receiptSum?.toFixed(2)})
      </h1>
        <h1 className="text-xl md:text-2xl  text-muted-foreground px-5 ">
          Remaining Budget: (Cash Flow: ${remainingBudget}) </h1>
      <p className="text-center items-center px-5 text-muted-foreground">
       Analyze your data with Budget Buddy?
      </p><div className="flex justify-center">
        <ArrowDown className="text-muted-foreground"/>
       
        </div>
      
      <div className="items-center justify-center text-center">
  {receipts.length >= 4 ? (
    <Button variant="ghost" asChild> 
      <div>
        <Link href={"/data"} className="underline font-semibold">Yes Please!</Link>
      </div>
    </Button>
  ) : (
    <Button variant="ghost"> 
      <div>
         Need more receipts!
      </div>
    </Button>
  )}
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
         
         <p className="bg-green-100 inline-flex py-0.5 px-2 rounded-full text- text-muted-foreground text-xs mb-2">
          {receipt.paymentType}
         </p>
         <Badge variant="success">{receipt.category}</Badge>
         <span className="text-sm font-medium text-gray-500 dark:text-gray-400 text-right">
          {receipt.date}
         </span>
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
  </div>
 );
}
