"use server";
import { CloudCog } from "lucide-react";
import prisma from "../lib/db"

import { redirect } from "next/navigation";

export async function uploadPhoto(formData) {
  console.log(formData)
    const imgUrl = formData.get("imgUrl");
    const category = formData.get("category")
    const location = formData.get("location")
    const description = formData.get("description")
    const date = formData.get("date")

    console.log(imgUrl);
  
    if (imgUrl) {
      const webhookUrl = "https://hook.us1.make.com/id4e9dm1xua46m59eexfx83slpvks7bo";
      const imgData = { 
        imgUrl,
        category,
        location,
        description,
        date
      };
  
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imgData),
      });
  
      if (!response.ok) {
        console.error("Error sending ticket data to webhook:", response.statusText);
      } else {
        console.log("Image to webhook successfully!");
      }
    } else {
      // Handle the case where imgUrl is missing (optional)
      console.error("Missing imgUrl in form data");
      return; // Early return if imgUrl is missing
    }
      redirect("/home");
}

export async function getAllReceipts() {
  const allReceipts = await prisma.receipts.findMany({
    orderBy: {
      date: 'desc' // Sort by date in descending order
    }
  });
  // console.log(allReceipts);
  return allReceipts;
}


export async function getReceiptDataForWebhook() {
    // Query all receipts
    const receipts = await prisma.receipts.findMany();
    // Extract desired data
    const extractedData = receipts.map((receipt) => ({
      category: receipt.category,
      location: receipt.location,
      total: receipt.total,
    }));
    const allReceiptsData = {
      receipts: extractedData, // Use the existing extractedData array
    };

   

    if(extractedData) {
      const webhookUrl = "https://hook.us1.make.com/wps13kuyrhkcko94k4i1dq68lxmcwvlg";

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(allReceiptsData)
      });

    if (!response.ok) {
      console.error("Error sending receipt data to webhook:", response.statusText);
    } else {
      console.log("Data sent to webhook successfully!");
    }
  } else {
    // Handle the case where imgUrl is missing (optional)
    console.error("Something went wrong", error);
    return; // Early return if imgUrl is missing
  }

}