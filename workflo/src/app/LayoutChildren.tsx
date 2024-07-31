"use client";

import { Navbar } from "@/components/Navbar/Navbar";
import { SessionNavbar } from "@/components/Navbar/SessionNavbar";
import { Sidebar } from "@/components/Sidebar/Sidebar";
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
    <div className={`${(pathname === "/"||pathname==="/login") && "gradient-bg"}`}>
      <NextTopLoader color="#4534ac" showSpinner={false} height={4} />
      {!session && <Navbar />}
      {session&&<SessionNavbar/>}
      {session && <Sidebar session={session} user={user} />}
      <div className={`${session && "ml-[260px] mt-[70px]"}`}>{children}</div>
    </div>
  );
};
