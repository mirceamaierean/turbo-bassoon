import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { signup } from "@/actions/auth/actions";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { SignUpForm } from "@/components/sign-up-form";
import logo from "../../public/images/logo_simquery.png";

export default async function SignUpPage() {
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
            <SignUpForm />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
