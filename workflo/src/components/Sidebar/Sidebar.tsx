"use client";

import { UserDoc } from "@/lib/db";
import { Session, User } from "lucia";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const menuItems = ["Home", "Boards", "Settings", "Teams", "Analytics"];

interface SidebarProps {
  session: Session | null;
  user: User | null;
}

export const Sidebar: React.FC<SidebarProps> = ({ session, user }) => {
  const [userInfo, setUserInfo] = useState<UserDoc | null>(null);

  const getUserInfo = async () => {
    const response = await fetch(`http://localhost:3005/getUserInfo`, {
      method: "POST",
      body: JSON.stringify({
        userId: user?.id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data: UserDoc = await response.json();
    setUserInfo(data);
  };

  useEffect(() => {
    getUserInfo();
  });

  return (
    <div className="w-[260px] h-full fixed l-0 border-r flex flex-col p-[16px] space-y-[32px]">
      {userInfo && (
        <div className="flex items-center gap-[12px]">
          <Image
            className="rounded-lg"
            alt="userImage"
            src={userInfo.avatar}
            width={32}
            height={32}
          />
          <h1 className="font-[500] text-[14px] leading-[24px]">
            {userInfo.fullName}
          </h1>
        </div>
      )}
      {!userInfo && <div>Loading...</div>}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-[20px]">
          <Image alt="img" width={24} height={24} src={"/bell.svg"} />
          <Image alt="img" width={24} height={24} src={"/dash-loader.svg"} />
          <Image alt="img" width={24} height={24} src={"/arrows.svg"} />
        </div>
        <Link href={"/signout"} className="bg-[#F4F4F4] text-[#797979] font-[400] text-[16px] leading-[20px] p-[10px] rounded-[8px] flex items-center justify-center">
          Logout
        </Link>
      </div>


      <div className="flex flex-col space-y-[8px] items-start justify-center">
        {
            menuItems.map((item, index)=>{
                return<button key={index} className="flex items-center gap-[14px] hover:bg-[#F4F4F4] w-full p-[8px] rounded-[8px]"  >
                    <Image alt={item} width={24} height={24} src={`/${item}.svg`} />
                    <h1 className="font-[600] text-[16px] text-[#797979] leading-[24px]" >{item}</h1>
                </button>
            })
        }
      </div>

      <button className="w-full h-[40px] bg-[#4534ac] text-[#ffffff] p-[8px] rounded-[8px] flex items-center justify-center gap-[8px]" >
        <h1>Create new task</h1>
        <Image alt="img" width={24} height={24} src={"/plus.svg"} />
      </button>
    </div>
  );
};
