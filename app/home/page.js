"use client";

import { SubmitButton } from "../../components/SubmitButton";
import { SingleImageDropzone } from "../../components/SingleImage";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { cn } from "../../lib/utils";
import { Calendar } from "../../components/ui/calendar";
import {
 Popover,
 PopoverContent,
 PopoverTrigger,
} from "../../components/ui/popover";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "../../lib/edgestore";
import { uploadPhoto } from "../../lib/actions";
import ReceiptCard from "../../components/ReceiptCard";
import { Card } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import {
 Select,
 SelectTrigger,
 SelectValue,
 SelectContent,
 SelectItem,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";

import Image from "next/image";
import logo from "../../public/logo1.png";

import { useUser } from "@clerk/nextjs";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

export default function HomePage() {
 const { edgestore } = useEdgeStore();
 const router = useRouter();
 const { user } = useUser();
 const [file, setFile] = useState();
 const [userEmail, setUserEmail] = useState("");
 const [clerkId, setClerkId] = useState("");
 const [imageUrl, setImageUrl] = useState("");
 const [progressBar, setProgressBar] = useState(null);
 const [date, setDate] = useState("");

 useEffect(() => {
  if (user) {
   // Extract email address when user object is available
   setClerkId(user?.id);
   const email = user?.emailAddresses[0].emailAddress;
   if (email) {
    setUserEmail(email); // Set state only if email exists
   }
  }
 }, [user]); // Dependency on user object
 if (!userEmail) {
  return <div>Loading...</div>;
 }

 //  const { pending } = useFormStatus();

 const handleUpload = async (FormData) => {
  const category = FormData.get("category");
  const location = FormData.get("location");
  const description = FormData.get("description");
  const date = FormData.get("date");
  const clerkId = FormData.get("clerkId");
  const userEmail = FormData.get("userEmail");
  if (file) {
   const res = await edgestore.publicFiles.upload({
    file,
    onProgressChange: (progress) => {
     setProgressBar(progress);
     // You can use this to show a progress bar
     console.log(progress);
    },
   });

   const imageUrl = res.url;

   const fileSize = file.size;
   const fileType = file.type;
   const formattedDate = format(new Date(date), "MM-dd-yyyy");

   const receiptData = {
    imageUrl,
    category,
    location,
    description,
    formattedDate,
    fileSize,
    fileType,
    clerkId,
    userEmail,
   };

   await uploadPhoto(receiptData);

   router.push("/home");
  }
 };

 return (
  <>
   {progressBar !== null && <Progress value={progressBar} />}

   <form action={handleUpload}>
    <input type="hidden" name="clerkId" value={clerkId} />
    <input type="hidden" name="userEmail" value={userEmail} />
    <input type="hidden" name="date" value={date} />
    <div className="flex flex-col max-h-full justify-center items-center bg-slate-200">
     <Image src={logo} width={100} height={100} alt="logo" />
     <h1 className="text-muted-foreground"> Receipt. Upload. Click. Done.</h1>
     <h1 className="mb-10 text-muted-foreground font-thin px-2 py-0.5 bg-slate-100 rounded-lg">
      {" "}
      Default Budget = $300
     </h1>
     <Card className="flex bg-white p-10 rounded-2xl">
      <div className="flex flex-col gap-y-4">
       <div>
        <Label className="text-muted-foreground">Category</Label>
        <Select name="category">
         <SelectTrigger>
          <SelectValue placeholder="Select category" />
         </SelectTrigger>
         <SelectContent>
          <SelectItem value="Transportation">Transportation</SelectItem>
          <SelectItem value="Groceries">Groceries</SelectItem>
          <SelectItem value="Shopping">Shopping</SelectItem>
          <SelectItem value="Bills">Bills</SelectItem>
          <SelectItem value="Entertainment">Entertainment</SelectItem>
          <SelectItem value="Other">Other</SelectItem>
         </SelectContent>
        </Select>
       </div>
       <div>
        <Label className="text-muted-foreground">Location</Label>
        <Input placeholder="Enter location here" name="location" />
       </div>
       <div>
        <Label className="text-muted-foreground">Description</Label>
        <Textarea
         placeholder="Enter short description here"
         name="description"
        />
       </div>
       <div className="flex flex-col">
        <Label className="text-muted-foreground mb-1">Date</Label>
        <Popover>
         <PopoverTrigger asChild>
          <Button
           variant={"outline"}
           className={cn(
            "w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
           )}
          >
           <CalendarIcon className="mr-2 h-4 w-4" />
           {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
         </PopoverTrigger>
         <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
          <Select
           onValueChange={(value) =>
            setDate(addDays(new Date(), parseInt(value)))
           }
          >
           <SelectTrigger>
            <SelectValue placeholder="Select" />
           </SelectTrigger>
           <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            {/* <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem> */}
           </SelectContent>
          </Select>
          <div className="rounded-md border">
           <Calendar mode="single" selected={date} onSelect={setDate} />
          </div>
         </PopoverContent>
        </Popover>
       </div>
       <SingleImageDropzone
        className="bg-green-50 hover:bg-slate-50"
        width={300}
        height={300}
        value={file}
        onChange={(file) => {
         setFile(file);
        }}
       />
       <SubmitButton />
      </div>
     </Card>
     <ReceiptCard clerkId={clerkId} userEmail={userEmail} />
    </div>
   </form>
  </>
 );
}
