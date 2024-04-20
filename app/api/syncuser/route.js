import prisma from "@/lib/db";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log(body);
    // Code to get first_name, id and email from the body
    const name = body.data.first_name;
    const email = body.data.email_addresses[0].email_address;
    const clerkId = body.data.id;

    const user = {
      clerkId: clerkId,
      name: name,
      email: email,
    };
    const userCreated = await prisma.user.create({
      data: user,
    });
    console.log(userCreated);
    return new Response(JSON.stringify(userCreated), {
      headers: {
        "Content-Type": "application/json",
      },
      status: 200, // Status code 200 for successful processing (can be adjusted based on logic)
    });
  } catch (error) {
    console.error(error); // Log errors for debugging
    return new Response(JSON.stringify({ error: "Something went wrong" }), {
      status: 500, // Internal Server Error status code
    });
  }
}
