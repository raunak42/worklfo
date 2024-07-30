"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { Session, User } from "lucia";
import { usePathname } from "next/navigation";
import NextTopLoader from "nextjs-toploader";

interface LayoutChildrenProps {
  children: React.ReactNode;
  session: Session | null;
  user: User | null;
}
export const LayoutChildren: React.FC<LayoutChildrenProps> = ({
  children,
  session,
  user,
}) => {
  const pathname = usePathname();

  return (
    <div className={`${pathname === "/" && "gradient-bg"}`}>
      <NextTopLoader color="#4534ac" showSpinner={false} height={4} />
      {!session && <Navbar />}
      {session && (
        <div className="w-[260px] h-full fixed l-0 border-r flex flex-col">
          <h1>{user?.username}</h1>
        </div>
      )}
      <div className={`${session && "ml-[260px]"}`}>{children}</div>
    </div>
  );
};
