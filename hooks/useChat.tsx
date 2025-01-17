import { Message } from "@/lib/types";

export const getUserConversations = async (userId: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SELF_URL +
        "/api/getConversationsByUserId?userId=" +
        userId,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user conversations:", error);
  }
};

export const getConversationMessages = async (conversationId: string) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SELF_URL +
        `/api/getMessagesByConversationId?conversationId=${conversationId}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching conversation messages:", error);
  }
};

export const fetchAIResponse = async (
  userMessage: string,
  startDate: string,
  endDate: string,
) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_SELF_URL + "/api/model",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
          startDate,
          endDate,
        }),
      },
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching AI response:", error);
  }
};

export const fetchSendUserMessage = async (
  message: Message,
  conversationId: string,
  userId: string,
) => {
  try {
    await fetch(process.env.NEXT_PUBLIC_SELF_URL + "/api/conversation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
        userId,
      }),
    });
  } catch (error) {
    console.error("Error sending user message:", error);
  }
};
