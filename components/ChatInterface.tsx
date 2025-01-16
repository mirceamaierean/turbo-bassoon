"use client";
import React, { useState } from "react";
import { useChat } from "@/hooks/useChat";
import { Sidebar } from "@/components/Sidebar";
import { ChatMessage } from "@/components/ChatMessage";
import { ChatInput } from "@/components/ChatInput";
import { FEATURED_QUESTIONS } from "@/lib/constants";

export function ChatInterface() {
  const {
    chatHistory,
    conversation,
    showConversation,
    chatContainerRef,
    fetchAIResponse,
    setShowConversation,
  } = useChat();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    setShowConversation(true);

    await fetchAIResponse(inputValue);
  };

  return (
    <div className="flex h-screen bg-[#EADEDA]">
      <Sidebar chatHistory={chatHistory} />

      <div className="flex-1 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 p-8 pb-16 flex flex-col items-center overflow-y-auto"
        >
          {!showConversation ? (
            <div className="space-y-6 max-w-2xl w-full">
              {FEATURED_QUESTIONS.map((q) => (
                <div
                  key={q.id}
                  className="p-6 rounded-lg border border-[#947EB0] bg-white flex items-center gap-6 shadow-md"
                >
                  <div className="w-12 h-12 rounded-full bg-[#498C8A] flex items-center justify-center text-white text-xl flex-shrink-0">
                    ?
                  </div>
                  <p className="text-[#1A181B] text-lg">{q.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full max-w-2xl space-y-4 pt-8">
              {conversation.map((message, i) => (
                <ChatMessage key={i} message={message} />
              ))}
            </div>
          )}
        </div>

        <ChatInput
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}
