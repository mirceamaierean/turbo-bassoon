import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function POST(request: Request) {
    const { message, conversationId} = await request.json();
    //console.log(message, conversationId);

    const supabase = createClient();
    const { data: dataUser } = await supabase.auth.getUser();
    const user = dataUser.user;
    if (!user)
        return NextResponse.json({ error: "User not found" }, { status: 404 });

    // Check if the conversation exists
    const { data: conversationData, error: fetchError } = await supabase
        .from("conversation")
        .select("message")
        .eq("id", conversationId)
        .single();

    if (fetchError) {
        // If the conversation does not exist, create a new one
        const { data, error } = await supabase
            .from("conversation")
            .insert({
                id: conversationId,
                user_id: user.id,
                message: [{ question: message.question, urls: message.urls}],
                created_at: new Date().toISOString(),
            })
            .single();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ data });
    }

    // Append the new message to the existing messages array
    const updatedMessages = [...conversationData.message, message];

    // Update the conversation with the new messages array
    const { data, error } = await supabase
        .from("conversation")
        .update({ message: updatedMessages })
        .eq("id", conversationId)
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ data });
}