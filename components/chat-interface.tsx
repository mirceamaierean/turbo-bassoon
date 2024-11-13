"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, MessageSquare, Plus, User, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ChatInterface() {
  const [chatHistory, setChatHistory] = useState([
    { id: 1, text: "Where is Elodia?" },
    { id: 2, text: "Did Romania win WW2?" },
    { id: 3, text: "Was Geoana in PSD?" },
  ]);

  const featuredQuestions = [
    {
      id: 1,
      text: "Did Romania secretly win World War II and forget to tell everyone?",
    },
    {
      id: 2,
      text: "Are the potholes in Bucharest part of a new urban art project?",
    },
    { id: 3, text: "Did the politicians forget the password to progress?" },
  ];

  const [inputValue, setInputValue] = useState("");
  const [conversation, setConversation] = useState([]);
  const [showConversation, setShowConversation] = useState(false);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      const newMessage = { id: Date.now(), text: inputValue, sender: "user" };
      setConversation([...conversation, newMessage]);
      setChatHistory((prevHistory) => [newMessage, ...prevHistory]);
      setInputValue("");
      setShowConversation(true);

      // Simulate AI response
      setTimeout(() => {
        const aiResponse = {
          id: Date.now(),
          text: "I'm an AI assistant. I can try to answer your question about Romanian politics.",
          sender: "ai",
        };
        setConversation((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex h-screen bg-[#EADEDA]">
      {/* Sidebar */}
      <div className="w-80 bg-[#1A181B] text-white p-4 flex flex-col">
        <div className="flex items-center gap-2 mb-4">
          <MessageSquare className="w-6 h-6" />
          <h1 className="text-xl font-bold">SimQuery</h1>
        </div>

        <Button className="w-full mb-6 bg-[#498C8A] hover:bg-[#498C8A]/90">
          <Plus className="w-4 h-4 mr-2" />
          New chat
        </Button>

        <div className="mb-4 flex-grow">
          <h2 className="text-sm text-gray-400 mb-2">Chat History</h2>
          <ScrollArea className="h-[calc(100vh-280px)]">
            {chatHistory.map((q) => (
              <div
                key={q.id}
                className="flex items-center gap-2 p-2 rounded hover:bg-[#766C7F] cursor-pointer mb-1"
              >
                <MessageSquare className="w-4 h-4 text-gray-400" />
                <span className="text-sm">{q.text}</span>
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* User Profile */}
        <div className="mt-auto pt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage
                src="/placeholder.svg?height=32&width=32"
                alt="User"
              />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <div className="flex-grow">
              <p className="text-sm font-medium">Mihai Costel</p>
              <p className="text-xs text-gray-400">mihai@example.com</p>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-4 w-4" />
              <span className="sr-only">User settings</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div
          ref={chatContainerRef}
          className="flex-1 p-8 pb-16 flex flex-col items-center overflow-y-auto"
        >
          {!showConversation ? (
            <>
              <h1 className="text-4xl font-bold text-[#1A181B] mb-12 text-center">
                Ask anything you want
                <br />
                about Romanian Politics!
              </h1>

              <div className="space-y-6 max-w-2xl w-full">
                {featuredQuestions.map((q) => (
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
            </>
          ) : (
            <div className="w-full max-w-2xl space-y-4 pt-8">
              {conversation.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-3/4 p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-[#498C8A] text-white"
                        : "bg-white border border-[#947EB0]"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-auto p-6 border-t border-gray-200">
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Is Galati part of Romania?"
              className="pr-12 py-6 text-lg bg-white"
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#498C8A] hover:bg-[#498C8A]/90"
            >
              <Send className="w-5 h-5" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
