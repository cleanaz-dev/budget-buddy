"use client";

import React, { useEffect, useState } from "react";

import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
 DialogTrigger,
 DialogFooter,
 DialogClose
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import {
 Table,
 TableBody,
 TableCaption,
 TableCell,
 TableHead,
 TableHeader,
 TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardHeader, CardContent, CardFooter } from "./ui/card";
import {
  deleteSingleReceipt,
 getAllReceipts,
 getUserDetails,
 getUserReceipts,
} from "../lib/actions";
import Link from "next/link";
import {
 ArrowBigDown,
 ArrowBigDownIcon,
 ArrowDown,
 DeleteIcon,
 EyeIcon,
 Trash,
} from "lucide-react";
import { DeleteReceiptButton } from "./SubmitButton";

export default function ReceiptCard(props) {
 const { clerkId, userEmail } = props;

 const [receipts, setReceipts] = useState([]);
 const [receiptSum, setReceiptSum] = useState(0);
 const [userDetails, setUserDetails] = useState([]);
 useEffect(() => {
  const fetchReceipts = async () => {
   try {
    // getAllReceipts is an asynchronous function that retrieves receipts
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

 useEffect(() => {
  const fetchUserDetails = async () => {
   try {
    const userDetails = await getUserDetails(clerkId);
    setUserDetails(userDetails);
   } catch (error) {
    console.error("Error fetching user details:", error);
   }
  };

  fetchUserDetails();
 }, [clerkId]);

 const userBudget = userDetails.budget;

 const remainingBudget = (userBudget - receiptSum).toFixed(2);

 return (
  <div>
   <main className="flex-col p-6 md:p-10 mt-6 ">
    <div className="mb-6">
     <div className="">
      <div className="flex flex-col gap-2 mb-6 text-center justify-center border-2 border-slate-100 rounded-md bg-slate-100 py-2">
       
        <p className="text-xl md:text-2xl text-muted-foreground px-5 font-bold ">
         Receipts: {receipts?.length}
        </p>
        <p className="text-xl md:text-2xl  text-muted-foreground px-5 font-bold ">
         Budget: $ {userBudget}
        </p>
        <p className="text-xl md:text-2xl text-muted-foreground px-5 ">
         Spending: $ {receiptSum?.toFixed(2)}
        </p>
        <p className="text-xl md:text-2xl text-muted-foreground px-5 ">
         Cash Flow: $ {remainingBudget}{" "}
        </p>
     
      </div>
      <div className="text-center">
       <p className="text-center items-center px-5 text-muted-foreground">
        Analyze your data with Budget Buddy?
       </p>
       <div className="flex justify-center mt-1">
        <ArrowDown className="text-muted-foreground animate-bounce" />
       </div>

       <div className="items-center justify-center text-center">
        {receipts.length >= 4 ? (
         <Button variant="ghost" asChild>
          <div>
           <Link href={"/data"} className="underline font-semibold">
            Yes Please!
           </Link>
          </div>
         </Button>
        ) : (
         <Button variant="ghost">
          <div>Need more receipts!</div>
         </Button>
        )}
       </div>
      </div>
     </div>
    </div>
    <div className="flex flex-col  gap-y-4">
     {receipts?.map((receipt) => (
      <Card
       className="bg-gradient-to-tr from-white to-green-100/50"
       key={receipt.id}
      >
       <CardHeader >
        <div className="flex  justify-between">
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
        <div className="flex items-center justify-between">
         <div>
          <h3 className="text-lg font-medium">{receipt.location}</h3>
          <p className="text-gray-500 dark:text-gray-400">
           {receipt.description}
          </p>
         </div>

         <div className="flex items-center gap-2">
          <span className="text-lg font-medium">{receipt.total}</span>
          <Button size="sm" variant="outline" className="" asChild>
           <Link href={receipt.imgUrl}><EyeIcon size={20}/></Link>
          </Button>
         
          <Dialog>
           <DialogTrigger asChild>
            <Button variant="secondary"><Trash /></Button>
           </DialogTrigger>
           <DialogContent>
            <p>Are you sure you want to delete this receipt?</p>
            <form action={deleteSingleReceipt}>
            <Input
              name="receiptId"
              value={receipt.id}
              className="col-span-3 border-none"
              type="hidden"
            />
            <div className="flex gap-2">

            <p>{receipt.location}</p>
            
            <p>{receipt.description}</p>

            <p>{receipt.total}</p>
            </div>
            <DialogFooter>
              <DialogClose>
                <DeleteReceiptButton />
              </DialogClose>
            </DialogFooter>
          </form>
           </DialogContent>
          </Dialog>
         </div>
        </div>
       </CardContent>
      </Card>
     ))}
    </div>
   </main>
  </div>
 );
}
