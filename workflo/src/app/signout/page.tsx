import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { lucia, validateRequest } from "@/auth";

export default async function Page() {
  return (
    <form action={logout}>
      <button className="h-[40px] w-[250px] p-[4px] bg-[#4534ac] text-[#ffffff] rounded-[8px]">
        Logout
      </button>
    </form>
  );
}

async function logout(): Promise<ActionResult> {
  "use server";
  const { session } = await validateRequest();
  if (!session) {
    return {
      error: "Unauthorized",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
  return redirect("/login");
}

interface ActionResult {
  error: string | null;
}
