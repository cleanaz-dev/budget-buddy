"use client";

import { SubmitButton } from "../../components/SubmitButton";
import { SingleImageDropzone } from "../../components/SingleImage";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useEdgeStore } from "../../lib/edgestore";
import { uploadPhoto } from "../../lib/actions";
import ReceiptCard from "../../components/ReceiptCard";
import { Card } from "../../components/ui/card";
import { Textarea } from "../../components/ui/textarea";
import { Progress }  from "../../components/ui/progress"
import Image from "next/image";
import logo from "../../public/logo1.png"
import { useFormStatus } from 'react-dom';


export default function HomePage() {
 const [file, setFile] = useState();
 const [imageUrl, setImageUrl] = useState("");
 const [progressBar, setProgressBar] = useState(null)
 
//  const [category, setCategory] = useState("");
//  const [location, setLocation] = useState("");
//  const [description, setDescription] = useState("");
//  const [date, setDate] = useState("")
 const { edgestore } = useEdgeStore();
 const router = useRouter();
//  const { pending } = useFormStatus();

 const handleUpload = async (FormData) => {
    
    
    const category = FormData.get("category")
    console.log("category",category)
    const location = FormData.get("location")
    console.log("location",location)
    const description = FormData.get("description")
    console.log("description",description)
    const date = FormData.get("date")
    console.log("date",date)
  if (file) {
   
   const res = await edgestore.publicFiles.upload({
    file,
    onProgressChange: (progress) => {
    setProgressBar(progress)
     // You can use this to show a progress bar
     console.log(progress);
    },
   });
   
  
   const imageUrl = res.url

   const fileSize = file.size
   const fileType = file.type
   

   const receiptData = {
    imageUrl,
    category,
    location,
    description,
    date,
    fileSize,
    fileType
    
   }
   
   await uploadPhoto(receiptData);
   
   router.push("/home");
  }
 };

 return (
  <>
  {progressBar !== null && (
   <Progress value={progressBar} />
  )}
   <form action={handleUpload}>
    <div className="flex flex-col max-h-full justify-center items-center bg-slate-200">
        <Image src={logo} width={100} height={100} alt="logo"/>
    <h1 className="pb-10 text-muted-foreground"> Receipt. Upload. Click. Done.</h1>
     <Card className="flex bg-white p-10 rounded-2xl">
      <div className="flex flex-col gap-y-4">
       <div>
       {/* <Input
        type="hidden"
        name="imgUrl"
        value={imageUrl} // Use extracted URL from state
       /> */}
        <Label className="text-muted-foreground">Category</Label>
        <Input
         placeholder="Enter category here"
         name="category"
        
        //  onChange={(e) => {
        //   setCategory(e.target.value);
        //  }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Location</Label>
        <Input
         placeholder="Enter location here"
         name="location"
         
        //  onChange={(e) => {
        //   setLocation(e.target.value);
        //  }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Description</Label>
        <Textarea
         placeholder="Enter short description here"
         name="description"
         
        //  onChange={(e) => {
        //   setDescription(e.target.value);
        //  }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Date</Label>
        <Input
         placeholder="MM-DD-YYYY"
         name="date"
         
        //  onChange={(e) => {
        //   setDate(e.target.value);
        //  }}
        
        />
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
     <ReceiptCard />
    </div>
   </form>
  </>
 );
}
