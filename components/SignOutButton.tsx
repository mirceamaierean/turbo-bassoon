"use client";

import { signout } from "@/actions/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOutIcon, LogOut } from "lucide-react";
export default function SignOutButton() {
  return (
    <Button
      variant="ghost"
      onClick={async () => {
        await signout();
      }}
      size="icon"
      className="rounded-full"
    >
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
