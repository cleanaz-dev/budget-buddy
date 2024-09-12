import prisma from "../../../lib/db";

export async function POST(request) {
  try {
   const body = await request.json();
 
   const {
    category,
    location,
    imgUrl,
    description,
    total,
    paymentType,
    date,
    clerkId,
    userEmail,
    fileSize,
    fileType,
   } = body;
 
   // Find the user by their clerkId
   const findFirstUser = await prisma.user.findFirst({
    where: { clerkId },
    select: { id: true, budget: true },
   });
 
   if (!findFirstUser) {
    return new Response(JSON.stringify({ error: "User not found" }), {
     headers: { "Content-Type": "application/json" },
     status: 404,
    });
   }
 
   // Create the new receipt
   const newReceipt = await prisma.receipts.create({
    data: {
     User: { connect: { id: findFirstUser.id } },
     category,
     location,
     imgUrl,
     description,
     total,
     paymentType,
     date,
    },
   });
 
   // Fetch all receipts for the user
   const allReceipts = await prisma.receipts.findMany({
    where: { userId: findFirstUser.id },
    select: { total: true },
   });
 
   // Calculate the total spent
   const totalSpent = allReceipts.reduce((sum, receipt) => {
    return sum + (parseFloat(receipt.total) || 0);
   }, 0);
 
   // Calculate remaining budget
   const currentBudget = parseFloat(findFirstUser.budget) || 0;
   const remainingBudget = currentBudget - totalSpent;
 
   // Update the new receipt with the remaining budget
   await prisma.receipts.update({
    where: { id: newReceipt.id },
    data: { remainingBudget },
   });
 
   // Include the remaining budget in the response
   const updatedReceipt = { ...newReceipt, remainingBudget };
 
   return new Response(JSON.stringify(updatedReceipt), {
    headers: {
     "Content-Type": "application/json",
    },
    status: 200,
   });
  } catch (error) {
   console.error(error);
   return new Response(JSON.stringify({ error: "Something went wrong" }), {
    headers: {
     "Content-Type": "application/json",
    },
    status: 500,
   });
  }
 }