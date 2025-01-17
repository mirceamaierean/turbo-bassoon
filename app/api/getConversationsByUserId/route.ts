import { createClient } from "@/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const userId = req.nextUrl.searchParams.get("userId");

  const { data: conversationData, error: fetchError } = await supabase
    .from("conversation")
    .select("id")
    .eq("user_id", userId)
    .order("created_at", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  return NextResponse.json({ data: conversationData });
}
