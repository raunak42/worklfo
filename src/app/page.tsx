"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center p-[8px] ">
      <div className="w-full h-full  flex flex-col items-center gap-[38px] ">
        <h1
          className={`text-[#4534ac] text-center mt-[32px] w-[50%] h-fit text-7xl transition-all duration-200 ${
            isVisible ? " -translate-y-6 opacity-100" : "opacity-0"
          }  `}
        >
          Navigate tasks easily with <strong>Workflo</strong>
        </h1>
        <div
          className={`mt-[32px] p-[32px] w-[34%] h-full bg-[#efe9fb] flex flex-col rounded-[16px] shadow-md items-center space-y-[12px] transition-all duration-700
            ${isVisible ? "-translate-y-6 opacity-100" : "opacity-0"}`}
        >
          <div className="flex flex-col w-full items-center justify-center space-y-[24px]">
            <input
              className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none"
              placeholder="Full name"
            ></input>
            <input
              className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none"
              placeholder="Email"
            ></input>
            <input
              className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none"
              placeholder="Password"
            ></input>
            <button className="bg-[#4534ac] w-full h-[40px] rounded-[8px] text-[#ffffff]">
              Signup
            </button>{" "}
          </div>

          <h1 className="text-center text-sm text-[#6b54bd] " >OR</h1>

          <button className="bg-[#ffffff] w-full h-[40px] rounded-[8px] text-[#ffffff] flex items-center justify-center">
            <Image width={40} height={100} alt="google" src={"/google.svg"} />
            <h1 className="text-[#6b54bd] font-semibold">Continue with google</h1>
          </button>
          <h1 className="text-center" >Already have an account? <Link className="text-[#0054A1]" href={"/login"} >Log in.</Link> </h1>
        </div>
      </div>
    </div>
  );
}
