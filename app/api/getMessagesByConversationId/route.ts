import {createClient} from "@/utils/supabase/server";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    const conversationId = req.nextUrl.searchParams.get("conversationId");
    const supabase = createClient();
    const { data: conversationData, error: fetchError } = await supabase
        .from("conversation")
        .select("message")
        .eq("id", conversationId)
        .order("created_at", { ascending: true });

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ data: conversationData });
}