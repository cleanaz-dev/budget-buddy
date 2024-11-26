"use server";
import { CloudCog } from "lucide-react";
import prisma from "../lib/db"
import Anthropic from '@anthropic-ai/sdk';
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


// export async function uploadPhoto(formData) {
  
    
//     const imageUrl = formData.imageUrl
//     const category = formData.category
//     const location = formData.location
//     const description = formData.description
//     const date = formData.formattedDate
//     const clerkId = formData.clerkId
//     const userEmail = formData.userEmail
//     const fileType = formData.fileType
//     const fileSize = formData.fileSize;
 
//     console.log(date)
    
  
//     if (imageUrl) {
//       const webhookUrl = "https://hook.us1.make.com/id4e9dm1xua46m59eexfx83slpvks7bo";
//       const imgData = { 
//         imageUrl,
//         category,
//         location,
//         description,
//         date,
//         clerkId,
//         userEmail,
//         fileSize,
//         fileType,
//       };
  
//       const response = await fetch(webhookUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(imgData),
//       });
  
//       if (!response.ok) {
//         console.error("Error sending ticket data to webhook:", response.statusText);
//       } else {
//         console.log("Image to webhook successfully!");
//       }
//     } else {
//       // Handle the case where imgUrl is missing (optional)
//       console.error("Missing imgUrl in form data");
//       return; // Early return if imgUrl is missing
//     }
//       revalidatePath("/home");
// }

export async function uploadPhoto(formData) {
  try {
    const {
      imageUrl,
      category,
      location,
      description,
      formattedDate,
      clerkId,
      fileType,
      fileSize,
    } = formData;

    // 1. Analyze image with Claude
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: [
          {
            type: 'text',
            text: `You're a finance assistant helping keep track of all receipts. Try your best to extract related data from receipt images. Only respond with taxes, payment method, and total. Your response should be formatted in a JSON like this:
            {
              "total": "total",
              "paymentType": "payment type"
            }
            Always provide the total $ and payment type in all caps and wrap values in "".`,
          },
          {
            type: 'image',
            source: {
              type: 'url',
              url: imageUrl,
            },
          },
        ],
      }],
    });

    // 2. Parse Claude's response
    const analysis = JSON.parse(message.content[0].text);

    // 3. Prepare the receipt data
    const receiptData = {
      imgUrl: imageUrl,
      total: analysis.total,
      paymentType: analysis.paymentType,
      category,
      location,
      description,
      date: formattedDate,
      clerkId,
      fileType,
      fileSize,
    };

    // 4. Send the receipt data to the API
    const response = await fetch('/api/addreceipt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(receiptData),
    });

    if (!response.ok) {
      throw new Error('Error adding receipt');
    }

    revalidatePath("/home");
    return receiptData;

  } catch (error) {
    console.error('Error processing receipt:', error);
    throw error;
  }
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
  try {
    const clerkId = formData.clerkId;

    const user = await prisma.user.findFirst({
      where: { clerkId },
      select: {
        id: true,
        budget: true,
      },
    });

    // Query all receipts
    const receipts = await prisma.receipts.findMany({
      where: { userId: user.id },
    });

    // Extract desired data
    const extractedData = receipts.map((receipt) => ({
      category: receipt.category,
      location: receipt.location,
      total: receipt.total,
      description: receipt.description,
      date: receipt.date,
    }));

    const allReceiptsData = {
      receipts: extractedData,
      userId: user.id,
      userBudget: user.budget,
    };

    // Prepare the prompt for Claude
    const prompt = `You're a finance advisor. Your job is to look over receipt data and spot trends and spending habits. Break down your response like a report. Their budget is ${user.budget}.

    Expenses:

    Trends:

    Remaining Budget (calculate remaining budget):

    Here's a guideline on how to output:

    Expense Report

    Expenses:
    Do not show dates in expenses.

    Trends:

    Remaining Budget:
    (Put budget on a new line)
    Example:
    Remaining Budget:
    - [remaining budget]

    Summary:
    For the summary, write one paragraph summing up their spending and current budget.
    Always start it with "My analysis shows that spending is on..."`;

    // Send the data to Claude for analysis
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 1000,
      messages: [
        {
          role: 'assistant',
          content: prompt,
        },
        {
          role: 'user',
          content: JSON.stringify(allReceiptsData),
        },
      ],
    });

    // Extract Claude's response
    const analysis = message.content[0].text;

    // Save the analysis to the database
    await prisma.budgetBuddy.create({
      data: {
        trends: analysis.match(/Trends:(.*?)Remaining Budget:/s)?.[1]?.trim(),
        expenses: analysis.match(/Expenses:(.*?)Trends:/s)?.[1]?.trim(),
        summary: analysis.match(/Summary:(.*)/s)?.[1]?.trim(),
        remainingBudget: analysis.match(/Remaining Budget:\s*-\s*(.*)/s)?.[1]?.trim(),
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    console.log("Analysis saved to the database successfully!");
  } catch (error) {
    console.error("Something went wrong", error);
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
  // Fetch the user based on the clerkId; assuming there's only one user
  const user = await prisma.user.findFirst({
    where: { clerkId: userId },
  });

  // Check if user is found
  if (!user) {
    throw new Error("User not found");
  }

  // Fetch all analyses for the found user
  const allAnalysis = await prisma.budgetBuddy.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc', // Sort by date in ascending order
    },
  });

  return allAnalysis;
}