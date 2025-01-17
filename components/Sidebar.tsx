import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SignOutButton from "./SignOutButton";
import Link from "next/link";
import { v4 } from "uuid";

export default function Sidebar({
  chatHistory,
  activeChat,
  userEmail,
}: {
  chatHistory: string[];
  activeChat: string;
  userEmail: string;
}) {
  const newChatId = v4();
  return (
    <div className="w-80 bg-[#1A181B] text-white p-4 flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-6 h-6" />
        <h1 className="text-xl font-bold">SimQuery</h1>
      </div>

      <Link href={`/main-app/${newChatId}`}>
        <Button className="w-full mb-6 bg-[#498C8A] hover:bg-[#498C8A]/90">
          <Plus className="w-4 h-4 mr-2" />
          Conversație nouă
        </Button>
      </Link>

      <div className="mb-4 flex-grow">
        <h2 className="text-sm text-gray-400 mb-2">Istoric</h2>
        <ScrollArea className="h-[calc(100vh-280px)]">
          {chatHistory.length > 0 &&
            chatHistory.map((q) => (
              <Link href={`/main-app/${q}`} key={q}>
                {q === activeChat ? (
                  <div className="flex items-center gap-2 p-2 rounded-lg bg-stone-800 cursor-pointer mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{q}</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 p-2 rounded hover:bg-stone-800 cursor-pointer mb-1">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-sm">{q}</span>
                  </div>
                )}
              </Link>
            ))}
        </ScrollArea>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{userEmail} </p>
            <p className="text-xs text-gray-400"> </p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
