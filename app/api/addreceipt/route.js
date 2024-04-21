import prisma from "../../../lib/db";

export async function POST(request) {
 try {
  const body = await request.json();
  console.log(body);
// .toUpperCase()
  const category = body.category
  const location = body.location
  const imgUrl = body.imgUrl;
  const description = body.description;
  const total = body.total
  const paymentType = body.paymentType
  const date = body.date

  const newReceipt = await prisma.receipts.create({
   data: {
    category,
    location,
    imgUrl,
    description,
    total,
    paymentType,
    date
   },
  });

  return new Response(JSON.stringify(newReceipt), {
   headers: {
    "Content-Type": "application/json",
   },
   status: 200,
  });
 } catch (error) {
  console.error(error);
  return new Response(JSON.stringify({ error: "Something went wrong" }), {
   status: 500, // Internal Server Error status code
  });
 }
}
