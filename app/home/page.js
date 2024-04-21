"use client";

import { SubmitButton } from "../../components/SubmitButton";
import { SingleImageDropzone } from "../../components/SingleImage";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "../../lib/edgestore";
import { uploadPhoto } from "../../lib/actions";
import ReceiptCard from "../../components/ReceiptCard";
import { Card } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Progress } from "../../components/ui/progress";
import Image from "next/image";
import logo from "../../public/logo1.png";
import { useFormStatus } from "react-dom";
import { UserButton, useUser } from "@clerk/nextjs";
import { set } from "zod";

export default function HomePage() {
 const { edgestore } = useEdgeStore();
 const router = useRouter();
 const { user } = useUser();
 const [file, setFile] = useState();
 const [userEmail, setUserEmail] = useState("");
 const [clerkId, setClerkId] = useState("");
 const [imageUrl, setImageUrl] = useState("");
 const [progressBar, setProgressBar] = useState(null);

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
  const clerkId = FormData.get("clerkId")
  const userEmail = FormData.get("userEmail")
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

   const receiptData = {
    imageUrl,
    category,
    location,
    description,
    date,
    fileSize,
    fileType,
    clerkId,
    userEmail
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
    <div className="flex flex-col max-h-full justify-center items-center bg-slate-200">
     <div className="top-0 left-0 absolute p-5">
      <UserButton showName={true} />
     </div>
     <Image src={logo} width={100} height={100} alt="logo" />
     <h1 className="text-muted-foreground">
      {" "}
      Receipt. Upload. Click. Done.
     </h1>
     <h1 className="mb-10 text-muted-foreground font-thin px-2 py-0.5 bg-slate-100 rounded-lg">
      {" "}
      Default Budget = $300
     </h1>
     <Card className="flex bg-white p-10 rounded-2xl">
      <div className="flex flex-col gap-y-4">
       <div>
        <Label className="text-muted-foreground">Category</Label>
        <Input placeholder="Enter category here" name="category" />
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
       <div>
        <Label className="text-muted-foreground">Date</Label>
        <Input placeholder="MM-DD-YYYY" name="date" />
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
