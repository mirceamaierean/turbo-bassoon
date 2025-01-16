"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useState } from "react";
import { fetchAIResponse, fetchSendUserMessage } from "@/hooks/useChat";
import { Message } from "@/lib/types";

export default function ChatInput({
  conversationId,
  userId,
  setMessages,
}: {
  conversationId: string;
  userId: string;
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
}) {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value || !startDate || !endDate) return;
    const data = await fetchAIResponse(value, startDate, endDate);
    setMessages((prev) => [...prev, data as Message]);
    await fetchSendUserMessage(data as Message, conversationId, userId);
    setValue("");
  };

  const [value, setValue] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  return (
    <div className="mt-auto p-6 border-t border-gray-200">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex flex-col">
            <label htmlFor="start-date" className="text-sm text-gray-600 mb-1">
              Start Date:
            </label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="py-2 px-4 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="end-date" className="text-sm text-gray-600 mb-1">
              End Date:
            </label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="py-2 px-4 border rounded bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
        <div className="relative">
          <Input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Is Galati part of Romania?"
            className="w-full py-4 px-4 text-lg bg-white border rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 hover:bg-teal-500 focus:ring-2 focus:ring-teal-400"
          >
            <Send className="w-5 h-5 text-white" />
            <span className="sr-only">Send</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
