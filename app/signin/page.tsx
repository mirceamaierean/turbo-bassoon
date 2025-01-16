import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { CardContent, Card } from "@/components/ui/card";
import Image from "next/image";
import logo from "../../public/images/logo_simquery.png";
import { LoginForm } from "@/components/login-form";

export default async function SignInPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  if (data?.user) {
    redirect("/main-app");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-[1000px] items-center justify-between gap-8">
        <div className="hidden flex-1 flex-col items-start gap-4 md:flex">
          <div className="flex items-center gap-4">
            <Image
              src={logo}
              alt="SimQuery Logo"
              width={300}
              height={300}
              className="rounded-full bg-gray-200"
            />
            <h1 className="text-4xl font-bold">SimQuery</h1>
          </div>
        </div>
        <Card className="w-full max-w-[400px] border-0 shadow-none md:border md:shadow-sm">
          <CardContent className="p-0 md:p-6">
            <LoginForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
