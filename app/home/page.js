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
import Image from "next/image";
import logo from "../../public/logo1.png"

export default function HomePage() {
 const [file, setFile] = useState();
 const [imageUrl, setImageUrl] = useState("");
 const [category, setCategory] = useState("");
 const [location, setLocation] = useState("");
 const [description, setDescription] = useState("");
 const [date, setDate] = useState("")
 const { edgestore } = useEdgeStore();
 const router = useRouter();

 const handleUpload = async (e) => {
  e.preventDefault();

  if (file) {
   const formData = new FormData(); // Create a FormData object
   formData.append("file", file); // Append the file to the FormData
   formData.append("imgUrl", imageUrl);
   formData.append("category", category);
   formData.append("location", location);
   formData.append("description", description)
   formData.append("date", date)
   const res = await edgestore.publicFiles.upload({
    file,
    onProgressChange: (progress) => {
     // You can use this to show a progress bar
     console.log(progress);
    },
   });

   if (res.url) {
    // Check if res contains a url property
    setImageUrl(res.url);
   } else {
    console.error("Missing URL in upload response:", res);
    // Handle potential errors here (e.g., display error message)
   }
   await uploadPhoto(formData);
   console.log(formData);
   router.push("/home");
  }
 };

 return (
  <>
  
   <form onSubmit={handleUpload}>
    <div className="flex flex-col max-h-full justify-center items-center bg-slate-200">
        <Image src={logo} width={100} height={100} />
    <h1 className="pb-10 text-muted-foreground"> Receipt. Upload. Click. Done.</h1>
     <Card className="flex bg-white p-10 rounded-2xl">
      <div className="flex flex-col gap-y-4">
       <div>
       <Input
        type="hidden"
        name="imgUrl"
        value={imageUrl} // Use extracted URL from state
       />
        <Label className="text-muted-foreground">Category</Label>
        <Input
         placeholder="Enter category here"
         name="category"
         value={category}
         onChange={(e) => {
          setCategory(e.target.value);
         }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Location</Label>
        <Input
         placeholder="Enter location here"
         name="location"
         value={location}
         onChange={(e) => {
          setLocation(e.target.value);
         }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Description</Label>
        <Textarea
         placeholder="Enter short description here"
         name="description"
         value={description}
         onChange={(e) => {
          setDescription(e.target.value);
         }}
        />
       </div>
       <div>
        <Label className="text-muted-foreground">Date</Label>
        <Input
         placeholder="MM-DD-YYYY"
         name="date"
         value={date}
         onChange={(e) => {
          setDate(e.target.value);
         }}
        
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
