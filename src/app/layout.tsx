/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mono Resume - There's a new builder on the block.",
  description:
    "Create a standout resume with Mono Resume, a clean and minimalist resume builder. Featuring a unique code-inspired look with monospace fonts, it helps tech professionals showcase their skills in style. Easy to use, customizable, and perfect for making a lasting impression in the digital age.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
