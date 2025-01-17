import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { signin } from "@/actions/auth/actions";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../../public/images/logo_simquery.png";
import Image from "next/image";

import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
export default async function SignInPage() {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/");
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
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex flex-col items-center space-y-2">
              <h1 className="text-3xl font-bold">Bine ați venit!</h1>
              <p className="text-gray-500 dark:text-gray-400">
                Introduceți datele pentru a vă conecta la contul dvs.
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  placeholder="m@example.com"
                  required
                  type="email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Parolă</Label>
                <Input id="password" name="password" required type="password" />
              </div>
              <Button formAction={signin} className="w-full">
                Conectare
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2">
            <Link className="text-sm underline" href="/signup">
              Nu aveți cont? Creați unul acum!
            </Link>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}
