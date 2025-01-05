"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    email_confirm: true,
  };

  const { error } = await supabase.auth.signUp(data);

  if (error) {
    throw new Error(error.message);
  }
  console.log("redirecting to sign in");
  revalidatePath("/", "layout");
  redirect("/signin");
}

export async function signin(formData: FormData) {
  console.log("redirecting to main-app1");

  const supabase = createClient();

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw new Error(error.message);
  }
  console.log("redirecting to main-app");
  revalidatePath("/", "layout");
  redirect("/main-app");
}

export async function signout() {
  const supabase = createClient();

  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }

  redirect("/signin");
}
