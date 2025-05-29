import type { Metadata } from "next";
import "../ui/globals.css";
import {lexend} from "@/ui/fonts";

export const metadata: Metadata = {
  title: {
      template: "%s | FGC Hub",
      default: "FGC Hub"
  },
  description: "Your one stop shop for your fighting game needs!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
        lang="en"
        className={`${lexend.variable} antialiased`}>
      <body>
        {children}
      </body>
    </html>
  );
}
