import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userMessage, conversation } = await req.json();

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/prompt",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: userMessage,
          mode: "qa",
        }),
      }
    );

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching AI response:", error);
    return NextResponse.json(
      {
        text: "Failed to get response from AI.",
      },
      { status: 500 }
    );
  }
}
