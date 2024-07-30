import { checkUserInDb, verifyPassword } from "@/app/actions";
import { lucia, validateRequest } from "@/auth";
import { LoginCard } from "@/components/LoginCard/LoginCard";
import { emailInput, passwordInput } from "@/lib/zod";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const { session, user } = await validateRequest();
  if (session) {
    return redirect("/dashboard");
  }
  return (
    <form action={loginAndStartSession}>
      <div className="w-full h-full flex items-center justify-center p-[8px] ">
        <LoginCard
          isFullNameInput={false}
          altText="Don't have an account?"
          altLink="Signup."
          buttonText="Login"
          href="/"
        />
      </div>
    </form>
  );
}

const loginAndStartSession = async (formData: FormData) => {
  "use server";
  //login
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return;
  }

  const parsedPassword = passwordInput.safeParse(password);
  const parsedEmail = emailInput.safeParse(email);

  if (parsedPassword.error || parsedEmail.error) {
    return; //The function will stop here, but LoginCard also has the same zod validations. So LoginCard will continue to display alerts even if this function returns. Hence you don't need to transfer any info/warning from here to the dom.
  }

  const existingUser = await checkUserInDb(parsedEmail.data);

  if (!existingUser) {
    console.log("User doesnt exist.");
    return;
  }

  const verifiedPassword = await verifyPassword(
    parsedPassword.data,
    existingUser.hashedPassword!
  );

  if (!verifiedPassword) {
    console.log("Invalid username or pswd.");
    return;
  }

  //Start session
  const session = await lucia.createSession(existingUser._id, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set("auth_session", sessionCookie.value, sessionCookie.attributes);
  return redirect("/dashboard");
};
