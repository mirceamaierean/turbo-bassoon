"use client";
import { useState } from "react";
import ChatInput from "./ChatInput";
import { ChatMessage } from "./ChatMessage";
import { Message } from "@/lib/types";

export default function MainChat({
  msgs,
  id,
  userId,
}: {
  msgs: Message[];
  id: string;
  userId: string;
}) {
  const [messages, setMessages] = useState<Message[]>(msgs);
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 p-8 pb-16 flex flex-col items-center overflow-y-auto">
        <div className="w-full max-w-2xl space-y-4 pt-8">
          {messages.length > 0 &&
            messages.map((message, i) => (
              <ChatMessage key={i} message={message} />
            ))}
        </div>
      </div>

      <ChatInput
        conversationId={id}
        userId={userId}
        setMessages={setMessages}
      />
    </div>
  );
}
