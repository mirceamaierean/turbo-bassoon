"use client";
import { useState, useEffect, useRef } from "react";
import { Message } from "@/lib/types";

export function useChat() {
  const [chatHistory, setChatHistory] = useState<string[]>([]);
  const [conversation, setConversation] = useState<Message[]>([]);
  const [showConversation, setShowConversation] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const getUserConversations = async () => {
    try {
      const response = await fetch("/api/getConversationsByUserId/");
      const data = await response.json();
      //console.log(data);
      return data;
    } catch (error) {
      console.error("Error fetching user conversations:", error);
    }
  }

  const getConversationMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/getMessagesByConversationId?conversationId=${conversationId}`);
      const data = await response.json();
      if(data)
      {
        setConversation(data);
        setShowConversation(true);
      }
      return data;
    } catch (error) {
      console.error("Error fetching conversation messages:", error);
    }
  }

  const fetchSendUserMessage = async (message: Message, conversationId: string) => {
    try {
      const response = await fetch("/api/conversation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message,
          conversationId
        }),
      });

      const data = await response.json();
      setChatHistory((prev) => [...prev, data]);
    } catch (error) {
      console.error("Error sending user message:", error);
    }
  }

  const fetchAIResponse = async (userMessage: string, conversationId: string) => {
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
      if(conversation.length > 0)
        setConversation((prev) => [...prev, data]);
      else
        setConversation([data])
      await fetchSendUserMessage(data, conversationId);
    } catch (error) {
      console.error("Error fetching AI response:", error);
    }
  };

  return {
    getUserConversations,
    getConversationMessages,
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

