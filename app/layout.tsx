import BottomNav from "./BottomNav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ab-initio",
  description: "From the beginning",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
