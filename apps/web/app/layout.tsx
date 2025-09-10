import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scrum estimation",
  description: "Estimate scrum sessions",
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="max-w-7xl w-full m-auto px-4 mb-30">{children}</body>
    </html>
  );
}
