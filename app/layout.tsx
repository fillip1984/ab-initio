import BottomNav from "./BottomNav";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

//TODO: for bottom nav, daisyUI says we need to add viewport-fit=cover
// see: https://daisyui.com/components/bottom-navigation/
export const metadata = {
  title: "ab-initio",
  description: "From the beginning",
  // viewport: {
  //   content: "content:width=device-width, initial-scale=1, viewport-fit=cover",
  // },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto px-4">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
