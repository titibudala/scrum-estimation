import { Metadata } from "next";

import "./globals.css";
import Providers from "./_providers";

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
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
