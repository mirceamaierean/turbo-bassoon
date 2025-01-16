import {createClient} from "@/utils/supabase/server";
import {NextResponse} from "next/server";

export async function GET() {
    const supabase = createClient();
    const { data: dataUser } = await supabase.auth.getUser();
    const user = dataUser.user;
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    const { data: conversationData, error: fetchError } = await supabase
        .from("conversation")
        .select("id")
        .eq("user_id", user.id);

    if (fetchError) {
        return NextResponse.json({ error: fetchError.message }, { status: 500 });
    }

    return NextResponse.json({ data: conversationData });
}