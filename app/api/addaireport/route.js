import prisma from "../../../lib/db";

export async function POST(request) {
    try {
        const body = await request.json();
        const { expenses,  trends, summary, remainingBudget, userId } = body;
        console.log(expenses)
        console.log(trends)
        console.log(summary)
        console.log(remainingBudget)
        if (!body) {
            return new Response(JSON.stringify({
                error: "No data provided"
            }), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 400, // Status code 400 for bad request
            })
        } else {
            const newAnalysisData = await prisma.budgetBuddy.create({
                data: {
                    user: { connect: { id: userId } },
                    expenses,
                    trends,
                    summary,
                    remainingBudget,
                }
            });
            return new Response(JSON.stringify(newAnalysisData), {
                headers: {
                    "Content-Type": "application/json",
                },
                status: 200, // Status code 200 for successful processing (can be adjusted based on logic)
            });
        }
    } catch(error) {
        console.error("Error fetching analysis:", error);
        return new Response(JSON.stringify({
            error: "Internal Server Error"
        }), {
            headers: {
                "Content-Type": "application/json",
            },
            status: 500, // Status code 500 for internal server error
        });
    } 
}