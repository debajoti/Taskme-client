"use client"
import "./globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthProvider";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">   
        <body className="flex flex-col h-full" id="bg">
          <AuthProvider>
            <Navbar/>
            {children}
          </AuthProvider>
        </body>
    </html>
  );
}
