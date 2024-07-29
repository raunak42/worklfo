import { lucia } from "@/auth";
import { LoginCard } from "@/components/LoginCard/LoginCard";
import { User } from "@/lib/db";
import { generateId } from "lucia";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { emailInput, fullNameInput, passwordInput } from "@/lib/zod";
import { checkUserInDb } from "./actions";
import { pixelAvatars } from "@/lib/randomAvatars";

export default function Home() {
  return (
    //In the LoginCard, continuing with google does not trigger form action because google button is not a button but <a/> tag.
    <form action={signupAndStartSession}>
      <div className="w-full h-full flex items-center justify-center p-[8px] ">
        <LoginCard
          isFullNameInput={true}
          altText="Already have an account?"
          altLink="Login."
          href="/Login"
          buttonText="Signup"
        />
      </div>
    </form>
  );
}

const signupAndStartSession = async (formData: FormData): Promise<any> => {
  "use server";
  //signup
  const fullName = formData.get("fullName") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!fullName || !email || !password) {
    return;
  }

  const parsedFullName = fullNameInput.safeParse(fullName);
  const parsedPassword = passwordInput.safeParse(password);
  const parsedEmail = emailInput.safeParse(email);

  if (parsedPassword.error || parsedEmail.error || parsedFullName.error) {
    return; //The function will stop here, but LoginCard also has the same zod validations. So LoginCard will continue to display alerts even if this function returns. Hence you don't need to transfer any info/warning from here to the dom.
  }

  const hashedPassword = await bcrypt.hash(parsedPassword.data, 10);
  const userId = generateId(15);

  const existingUser = await checkUserInDb(parsedEmail.data);

  if (existingUser) {
    console.log("Email already exists.");
    return;
  }

  const randomAvatar =
    pixelAvatars[Math.floor(Math.random() * pixelAvatars.length)];

  await User.insertOne({
    email: parsedEmail.data,
    fullName: parsedFullName.data,
    hashedPassword: hashedPassword,
    _id: userId,
    avatar: randomAvatar,
  });

  // start session
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set("auth_session", sessionCookie.value, sessionCookie.attributes);
  return redirect("/dashboard");
};
