"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { handleClickFn } from "./handleClick";

interface LoginCardProps {
  isFullNameInput: boolean;
  buttonText: string;
  altLink: string;
  altText: string;
  href: string;
}

export const LoginCard: React.FC<LoginCardProps> = ({
  isFullNameInput,
  buttonText,
  altLink,
  altText,
  href,
}) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  //State for zod
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");

  //State for input warning display.
  const [passwordWarning, setPasswordWarning] = useState<string>("");
  const [emailWarning, setEmailWarning] = useState<string>("");
  const [fullNameWarning, setFullNameWarning] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(true);
    }, 10);
  }, []);

  const handleClick = async () => {
    await handleClickFn({
      setShowSpinner,
      setEmailWarning,
      setFullNameWarning,
      setPasswordWarning,
      fullName,
      email,
      password,
      buttonText,
    });
  };

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
        <div className="flex flex-col w-full items-center justify-center space-y-[8px]">
          {isFullNameInput && (
            <div className="w-full flex flex-col items-end">
              <input
                defaultValue={fullName}
                onChange={(e) => {
                  setFullName(e.currentTarget.value);
                }}
                className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none  text-[#6b54bd]"
                placeholder="Full name"
                name="fullName"
                id="fullName"
              ></input>
              <h1 className="text-xs font- text-red-600  h-[18px]">
                {fullNameWarning}
              </h1>
            </div>
          )}
          <div className="w-full flex flex-col items-end">
            <input
              defaultValue={email}
              onChange={(e) => {
                setEmail(e.currentTarget.value);
              }}
              className="bg-[#ffffff] w-full h-[40px] rounded-[8px] px-4 outline-none  text-[#6b54bd] "
              placeholder="Email"
              name="email"
              id="email"
            ></input>
            <h1 className="text-xs font- text-red-600  h-[18px]">
              {emailWarning}
            </h1>
          </div>
          <div className="w-full flex flex-col items-end">
            <div className="bg-[#ffffff] w-full h-[40px] rounded-[8px]  flex items-center justify-between">
              <input
                defaultValue={password}
                onChange={(e) => {
                  setPassword(e.currentTarget.value);
                }}
                type={`${showPassword ? "text" : "password"}`}
                className="] w-[90%] h-full rounded-[8px] px-4 outline-none  text-[#6b54bd] rounded-r-none"
                placeholder="Password"
                name="password"
                id="password"
              ></input>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
                className=" w-[10%] h-full flex items-center justify-center "
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
            <h1 className="text-xs font- text-red-600  h-[18px]">
              {passwordWarning}
            </h1>
          </div>
          <button
            onClick={handleClick}
            className="bg-[#4534ac] w-full h-[40px] rounded-[8px] text-[#ffffff] hover:-translate-y-[2px] transition-all duration-100 flex items-center justify-center"
          >
            {!showSpinner && buttonText}
            {showSpinner && (
              <Image
                className="animate-spin"
                alt="spinner"
                width={16}
                height={16}
                src={"/spinner-light.svg"}
              />
            )}
          </button>{" "}
        </div>

        <h1 className="text-center text-sm text-[#6b54bd] ">OR</h1>

        <a
          href="/login/google"
          className="bg-[#ffffff] w-full h-[40px] rounded-[8px] text-[#ffffff] flex items-center justify-center hover:-translate-y-[2px] transition-all duration-100"
        >
          <Image width={40} height={100} alt="google" src={"/google.svg"} />
          <h1 className="text-[#6b54bd] font-semibold">Continue with google</h1>
        </a>
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
