"use client"
import { LoginCard } from "@/components/LoginCard/LoginCard";

export default function Home() {
  return (
    <div className="w-full h-full flex items-center justify-center p-[8px] ">
      <LoginCard fullNameInput={true} altText="Already have an account?"  altLink="Login." href="/Login" buttonText="Signup" />
    </div>
  );
}
