import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Work Day Scheduler | Plan Your Day Efficiently",
  description:
    "A beautiful and efficient daily planner for organizing your daily work schedule. Add, edit, and manage tasks hourly with real-time saving.",
  keywords: [
    "work day planner",
    "hourly scheduler",
    "daily tasks",
    "React 19 app",
    "task manager",
  ],
  openGraph: {
    title: "Work Day Scheduler",
    description:
      "Visual planner for organizing your daily work schedule. Smart task management with React 19 & Next 15 features like Server Actions, use(), and compiler optimizations.",
    url: "https://yourdomain.com",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} antialiased`}>{children}</body>
    </html>
  );
}
