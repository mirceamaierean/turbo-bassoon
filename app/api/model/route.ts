import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userMessage } = await req.json();

  const startDate = "2014-05-01";
  const endDate = "2024-10-01";

  try {
    const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: userMessage,
        start_date: startDate,
        end_date: endDate,
      }),
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      {
        text: "Failed to get response from AI.",
      },
      { status: 500 },
    );
  }
}
