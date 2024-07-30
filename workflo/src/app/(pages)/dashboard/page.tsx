import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (!session) {
    return redirect("/Login");
  }

  return <div className="bg-green-200" >Hello {user.username}</div>;
}
