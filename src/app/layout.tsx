import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";
import { validateRequest } from "@/auth";
import { ContextProvier } from "@/providers/ContextProvider";

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
          <NextTopLoader color="#4534ac" showSpinner={false} height={4} />
          {!session && <Navbar />}
          <div>{children}</div>
        </body>
      </ContextProvier>
    </html>
  );
}
