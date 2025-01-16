import { ChatInterface } from "@/components/ChatInterface";
import { v4 as uuidv4 } from 'uuid';

export default function Home({ params }: { params: { id: string } }) {
    const id = params.id || uuidv4();

    return <ChatInterface id={id} />;
}
