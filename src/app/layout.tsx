import type { Metadata } from "next";
import "../ui/globals.css";
import {lexend} from "@/ui/fonts";
import Navbar from "@/ui/Navbar";
import Footer from "@/ui/Footer";

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
        <body className="min-h-screen flex flex-col">
            <Navbar/>
            <main className="mt-32 md:mt-40 min-h-full">
                {children}
            </main>
            <Footer/>
        </body>
        </html>
    );
}