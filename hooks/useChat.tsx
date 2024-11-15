"use client";
import { useState, useEffect, useRef } from "react";
import { Message, Sender } from "@/lib/types";
import { INITIAL_CHAT_HISTORY } from "@/lib/constants";

export function useChat() {
  const [chatHistory, setChatHistory] = useState(INITIAL_CHAT_HISTORY);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [showConversation, setShowConversation] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const fetchAIResponse = async (userMessage: string) => {
    try {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "system", content: "You are a helpful assistant." },
              ...conversation.map((msg) => ({
                role: msg.sender === "user" ? "user" : "assistant",
                content: msg.text,
              })),
              { role: "user" as Sender, content: userMessage },
            ],
          }),
        }
      );

      const data = await response.json();
      const aiResponse: Message = {
        id: Date.now(),
        text:
          data.choices[0]?.message?.content ||
          "I'm sorry, I couldn't process that.",
        sender: "ai" as Sender,
      };

      setConversation((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setConversation((prev) => [
        ...prev,
        {
          id: Date.now(),
          text: "Failed to get response from AI.",
          sender: "ai" as Sender,
        },
      ]);
    }
  };

  return {
    chatHistory,
    setChatHistory,
    conversation,
    setConversation,
    showConversation,
    setShowConversation,
    chatContainerRef,
    fetchAIResponse,
  };
}
