import { connect } from "http2";
import prisma from "../../../lib/db";

export async function POST(request) {
  try {
    const body = await request.json();


    const { category, location, imgUrl, description, total, paymentType, date, clerkId, userEmail, fileSize, fileType } = body;

    const findFirstUser = await prisma.user.findFirst({
      where: { clerkId},
      select: { id: true }
    });

    if (findFirstUser) {
      const newReceipt = await prisma.receipts.create({
        data: {
          User: {connect: {id:findFirstUser.id }},
          category,
          location,
          imgUrl,
          description,
          total,
          paymentType,
          date
        }
      });
      

      return new Response(JSON.stringify(newReceipt), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      });
    } else {
      // Return a 404 Not Found response if the user with the specified clerkId is not found
      return new Response(JSON.stringify({ error: "User not found" }), {
        headers: {
          "Content-Type": "application/json",
        },
        status: 404,
      });
    }
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 500, // Internal Server Error status code
    });
  }
}
