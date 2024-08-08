"use server";
import { CloudCog } from "lucide-react";
import prisma from "../lib/db"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


export async function uploadPhoto(formData) {
  
    
    const imageUrl = formData.imageUrl
    const category = formData.category
    const location = formData.location
    const description = formData.description
    const date = formData.formattedDate
    const clerkId = formData.clerkId
    const userEmail = formData.userEmail
    const fileType = formData.fileType
    const fileSize = formData.fileSize;
 
    console.log(date)
    
  
    if (imageUrl) {
      const webhookUrl = "https://hook.us1.make.com/id4e9dm1xua46m59eexfx83slpvks7bo";
      const imgData = { 
        imageUrl,
        category,
        location,
        description,
        date,
        clerkId,
        userEmail,
        fileSize,
        fileType,
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
      revalidatePath("/home");
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

export async function getUserReceipts(clerkId) {

  const findUser = await prisma.user.findFirst({
    where: {clerkId},
    select: {id: true}
  })
  
  
  const userReceipts = await prisma.receipts.findMany({
    where: {userId: findUser.id},
    orderBy: {
      date: 'desc' // Sort by date in descending order
    }
  })
  
  return userReceipts
}

export async function getBudgetBuddyAnalysis(clerkId) {
  const findUser = await prisma.user.findFirst({
    where: {clerkId},
    select: {id: true}
  })
  
  const userBudgetBuddyAnalysis = await prisma.budgetBuddy.findMany({
    where: {userId: findUser.id}
  })
  
  return userBudgetBuddyAnalysis
}

export async function getReceiptDataForWebhook(formData) {
    const clerkId = formData.clerkId

    const user = await prisma.user.findFirst({
      where: {clerkId},
      select: {
        id: true,
        budget: true,
      }
    })
    // Query all receipts
    const receipts = await prisma.receipts.findMany({
      where: {userId: user.id},
    });
    // Extract desired data
    const extractedData = receipts.map((receipt) => ({
      category: receipt.category,
      location: receipt.location,
      total: receipt.total,
      description: receipt.description,
      date:receipt.date
    }));
    const allReceiptsData = {
      receipts: extractedData,
      userId: user.id,
      userBudget: user.budget
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

export async function deleteSingleAnalysis(FormData) {
  const analysisId = FormData.get("analysisId")
  console.log(analysisId)
  await prisma.budgetBuddy.delete({
    where: {
      id: analysisId
    }
  })
  revalidatePath(`/data`)
}

export async function archiveSingleAnalysis(FormData) {
  const analysisId = FormData.get("analysisId")
  await prisma.budgetBuddy.update({
    where: {
      id: analysisId
    },
    data: {
      isArchived: true
    }
  })
  revalidatePath(`/data`)
}

export async function getUserDetails(clerkId) {
  const findUser = await prisma.user.findFirst({
    where: {clerkId},
    select: {id: true}
  })
  
  const userDetails = await prisma.user.findUnique({
    where: {id: findUser.id}
  })
  
  return userDetails
}

export async function updateUserDetails(FormData) {
  const clerkId = FormData.get("clerkId")
  const budget = FormData.get("budget")
  const budgetCycle = FormData.get("budgetCycle")
  const accountType = FormData.get("accountType")

  const findUser = await prisma.user.findFirst({
    where: {clerkId},
    select: {id: true}
})

  await prisma.user.update({
    where: {id: findUser.id},
    data: {
      budget,
      budgetCycle,
      accountType
    }
  })
  redirect(`/home`)

}

export async function deleteSingleReceipt(FormData) {
  const receiptId = FormData.get("receiptId")
  await prisma.receipts.delete({
    where: {
      id: receiptId
    }
  })
  revalidatePath(`/home`)
}

export async function getAllAnalysisById(userId) {

  const user = await prisma.user.findFirst({
    where: {clerkId: userId},
    
  })

  const allAnalysis = await prisma.budgetBuddy.findMany({
    where: {
      userId: user.id,
    },
  })
  return allAnalysis


}