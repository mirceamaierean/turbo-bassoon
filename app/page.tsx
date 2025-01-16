import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function Page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-[1000px] items-center justify-between gap-8">
        <div className="hidden flex-1 flex-col items-start gap-4 md:flex">
          <div className="flex items-center gap-4">
            <Image
              src="/placeholder.svg?height=80&width=80"
              alt="SimQuery Logo"
              width={80}
              height={80}
              className="rounded-full bg-gray-200"
            />
            <h1 className="text-4xl font-bold">SimQuery</h1>
          </div>
        </div>
        <Card className="w-full max-w-[400px] border-0 shadow-none md:border md:shadow-sm">
          <CardContent className="p-0 md:p-6"></CardContent>
        </Card>
      </div>
    </main>
  );
}
