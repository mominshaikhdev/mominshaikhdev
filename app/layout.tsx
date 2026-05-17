import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Momin Shaikh — Full-Stack Engineer",
  description:
    "Portfolio of Momin Shaikh — Full-stack engineer building production-grade web apps with React, Next.js, Laravel and AI.",
  openGraph: {
    title: "Momin Shaikh — Full-Stack Engineer",
    description: "Full-stack engineer • React, Next.js, Laravel, AI/RAG",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
