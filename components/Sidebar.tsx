import { MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message } from "@/lib/types";
import SignOutButton from "./SignOutButton";
import { createClient } from "@/utils/supabase/client";

export async function Sidebar({ chatHistory }: { chatHistory: Message[] }) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  // if (!data.user) {
  //   console.log("redirecting to signin");
  //   return;
  // }
  const user = data.user;
  const email = user?.email;
  return (
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

      <div className="mt-auto pt-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
            <AvatarFallback>MC</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <p className="text-sm font-medium">{email} </p>
            <p className="text-xs text-gray-400"> </p>
          </div>
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}
