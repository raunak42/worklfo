import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { validateRequest } from "@/auth";
import { ContextProvier } from "@/providers/ContextProvider";
import { LayoutChildren } from "./LayoutChildren";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflo",
  description: "Navigate tasks easily with Workflo",
  icons: ["/brandmark-white.png"],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { session, user } = await validateRequest();
  return (
    <html lang="en">
      <ContextProvier>
        <body className={manrope.className}>
          <LayoutChildren user={user} session={session} >{children}</LayoutChildren>  
        </body>
      </ContextProvier>
    </html>
  );
}
