"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


export const Navbar: React.FC = () => {
  const [loginCLicked, setLoginClicked] = useState<boolean>(false);
  
  return (
    <div className="w-full py-[24px] px-[64px] flex flex-row items-center justify-between   ">
      <Image width={180} height={100} alt="logo" src={"/logo.svg"} />
      <Link
      href={"/Login"}
        className={` bg-[#4534ac] text-[#ffffff] w-[140px] h-[44px] rounded-full font-semibold ${
          !loginCLicked && "hover:-translate-y-1"
        } transition-all duration-200 flex items-center justify-center`}
      >
        {loginCLicked ? (
          <Image
            alt="spinner"
            width={24}
            height={24}
            src={"/spinner-light.svg"}
            className="animate-spin"
          />
        ) : (
          <h1>Login</h1>
        )}
      </Link>
    </div>
  );
};
