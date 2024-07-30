import { validateRequest } from "@/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (!session) {
    return redirect("/Login");
  }

  // const respone = await fetch(`http://localhost:3005/user/check`, {
  //   method: "GET",
  // });
  // const data = await respone.json();
  // console.log(data)

  return <div className="bg-green-200">Hello {user.username}</div>;
}
