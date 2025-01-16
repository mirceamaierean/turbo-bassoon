"use client";
import { useState, useEffect, useRef } from "react";
import { Message } from "@/lib/types";
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
      const response = await fetch("/api/model", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userMessage,
          conversation,
        }),
      });

      const data = await response.json();
      setConversation((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error fetching AI response:", error);
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
