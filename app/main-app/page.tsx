import { v4 } from "uuid";
import { redirect } from "next/navigation";

export default async function Home() {
  const id = v4();

  redirect(`/main-app/${id}`);
}
