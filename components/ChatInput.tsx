import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export function ChatInput({
  value,
  onChange,
  onSubmit,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <div className="mt-auto p-6 border-t border-gray-200">
      <form onSubmit={onSubmit} className="max-w-2xl mx-auto relative">
        <Input
          value={value}
          onChange={onChange}
          placeholder="Is Galati part of Romania?"
          className="w-full py-6 text-lg bg-white"
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
  );
}
