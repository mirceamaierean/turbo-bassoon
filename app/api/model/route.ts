import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userMessage, conversation } = await req.json();

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          ...conversation.map((msg: any) => ({
            role: msg.sender === "user" ? "user" : "assistant",
            content: msg.text,
          })),
          { role: "user", content: userMessage },
        ],
      }),
    });

    const data = await response.json();
    return NextResponse.json({
      text:
        data.choices[0]?.message?.content ||
        "I'm sorry, I couldn't process that.",
    });
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
