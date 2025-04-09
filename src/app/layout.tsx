import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./Home/School_Landing_Page/Layout/Header";
import Footer from "./Home/School_Landing_Page/Layout/Footer";
import Student_Rating_Review from "./Rating_Review_All/Student_Rating_Review/page"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SMS",
  description: "SMS",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Student_Rating_Review/>
        <Header/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}  
