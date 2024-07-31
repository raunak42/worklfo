"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export const SessionNavbar: React.FC = () => {
  const [loginCLicked, setLoginClicked] = useState<boolean>(false);
  const pathname = usePathname();

  return (
    <div className="w-full z-20 h-[70px] px-[16px] py-[20px] border-b fixed top-0 bg-white ">
      <Image width={140} height={140} alt="logo" src={"/logo.svg"} />
    </div>
  );
};
