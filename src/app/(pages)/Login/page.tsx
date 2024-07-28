import { LoginCard } from "@/components/LoginCard/LoginCard";

export default async function Page(){
    
    return<div className="w-full h-full flex items-center justify-center p-[8px] ">
      <LoginCard fullNameInput={false} altText="Don't have an account?" altLink="Signup." buttonText="Login" href="/" />
    </div>
}