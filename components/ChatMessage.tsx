import { Message } from "@/lib/types";

export function ChatMessage({ message }: { message: Message }) {
  return (
    <div
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
  );
}
