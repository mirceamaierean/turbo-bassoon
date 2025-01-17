import React from "react";
import Sidebar from "@/components/Sidebar";
import MainChat from "./MainChat";
import { getUserConversations, getConversationMessages } from "@/hooks/useChat";
import { createClient } from "@/utils/supabase/server";
import { Message } from "@/lib/types";
import { redirect } from "next/navigation";

export default async function ChatInterface({ id }: { id: string }) {
  const supabase = createClient();
  const { data: dataUser } = await supabase.auth.getUser();
  if (!dataUser.user) redirect("/signin");

  const chatHistory = (await getUserConversations(dataUser.user.id)).data.map(
    (conversation: { id: string }) => conversation.id,
  );

  if (!chatHistory.includes(id)) {
    chatHistory.push(id);
  }

  const data = (await getConversationMessages(id)).data;
  let messages: Message[] = [{ urls: [], question: "" }];
  if (data.length > 0) {
    messages = data[0].message as Message[];
  }

  return (
    <div className="flex h-screen bg-[#EADEDC]">
      <Sidebar
        chatHistory={chatHistory}
        activeChat={id}
        userEmail={dataUser.user.email as string}
      />
      <MainChat id={id} msgs={messages} userId={dataUser.user.id} />
    </div>
  );
}
