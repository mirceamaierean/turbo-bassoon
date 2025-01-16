import { Message } from "@/lib/types";

export function ChatMessage({ message }: { message: Message }) {
  console.log(message);
  return (
    <>
      <div className="flex justify-end">
        <div className="max-w-3/4 p-3 rounded-lg bg-[#498C8A]">
          <p>{message.question}</p>
        </div>
      </div>
      <div className="flex justify-start">
        <div className="max-w-3/4 p-3 rounded-lg bg-white border border-[#947EB0]">
          {/* iterate through data.url */}
          {message.urls.map((url, i) => (
            <div key={i}>
              <a
                href={url}
                target="_blank"
                rel="noreferrer"
                className="text-[#498C8A] underline"
              >
                {url}
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
