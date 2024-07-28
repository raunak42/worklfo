import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import { Navbar } from "@/components/Navbar/Navbar";
import NextTopLoader from "nextjs-toploader";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Workflo",
  description: "Navigate tasks easily with Workflo",
  icons: ["/brandmark-white.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.className}>
        <NextTopLoader color="#4534ac" showSpinner={false} height={4} />
        <Navbar />
        <div>{children}</div>
      </body>
    </html>
  );
}
