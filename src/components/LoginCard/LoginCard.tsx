"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface LoginCardProps {
  fullNameInput: boolean;
  buttonText: string;
  altLink: string;
  altText:string;
  href:string
}

export const LoginCard: React.FC<LoginCardProps> = ({
  fullNameInput,
  buttonText,
  altLink,
  altText,
  href
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);


  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  return (
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
          {fullNameInput && (
            <input
              className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none  text-[#6b54bd]"
              placeholder="Full name"
            ></input>
          )}
          <input
            className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none  text-[#6b54bd] "
            placeholder="Email"
          ></input>
          <div className="bg-[#ffffff] w-full h-[40px] rounded-[8px]  flex items-center justify-between">
            <input
              type={`${showPassword ? "text" : "password"}`}
              className="] w-[90%] h-full rounded-[8px] px-4 outline-none  text-[#6b54bd]"
              placeholder="Password"
            ></input>
            <button
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className=" w-[10%] h-full flex items-center justify-center"
            >
              {!showPassword ? (
                <Image
                  alt="eye-slash"
                  width={20}
                  height={20}
                  src={"/eye.svg"}
                />
              ) : (
                <Image
                  alt="eye"
                  width={20}
                  height={20}
                  src={"/eye-slash.svg"}
                />
              )}
            </button>
          </div>
          <button className="bg-[#4534ac] w-full h-[40px] rounded-[8px] text-[#ffffff] hover:-translate-y-[2px] transition-all duration-100">
            {buttonText}
          </button>{" "}
        </div>

        <h1 className="text-center text-sm text-[#6b54bd] ">OR</h1>

        <button className="bg-[#ffffff] w-full h-[40px] rounded-[8px] text-[#ffffff] flex items-center justify-center hover:-translate-y-[2px] transition-all duration-100">
          <Image width={40} height={100} alt="google" src={"/google.svg"} />
          <h1 className="text-[#6b54bd] font-semibold">Continue with google</h1>
        </button>
        <h1 className="text-center">
          {altText}{" "}
          <Link className="text-[#0054A1]" href={href}>
            {altLink}
          </Link>{" "}
        </h1>
      </div>
    </div>
  );
};
