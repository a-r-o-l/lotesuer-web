import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Initialcreen() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  } else {
    redirect("/dashboard");
  }

  return <div></div>;
}
