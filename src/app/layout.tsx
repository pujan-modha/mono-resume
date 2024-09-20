/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.BASE_URL!),
  applicationName: "Mono Resume",
  title: "Mono Resume - There's a new builder on the block.",
  description:
    "Create a standout resume with Mono Resume, a clean and minimalist resume builder. Featuring a unique code-inspired look with monospace fonts, it helps tech professionals showcase their skills in style. Easy to use, customizable, and perfect for making a lasting impression in the digital age.",
  keywords:
    "resume, resume builder, minimalist resume, code-inspired resume, monospace fonts, tech resume, digital resume, modern resume, professional resume, mono resume, monoresume, monoresume.com, pujan, pujan modha, pujan.pm",
  icons: {
    icon: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: `${process.env.BASE_URL}/favicon-16x16.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: `${process.env.BASE_URL}/favicon-32x32.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "48x48",
        url: `${process.env.BASE_URL}/favicon-48x48.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "96x96",
        url: `${process.env.BASE_URL}/favicon-96x96.png`,
      },
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: `${process.env.BASE_URL}/apple-touch-icon.png`,
      },
      {
        rel: "mask-icon",
        color: "#101010",
        url: `${process.env.BASE_URL}/safari-pinned-tab.svg`,
      },
    ],
    apple: [
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        url: `${process.env.BASE_URL}/apple-touch-icon.png`,
        href: `${process.env.BASE_URL}/apple-touch-icon.png`,
      },
      {
        rel: "mask-icon",
        color: "#101010",
        url: `${process.env.BASE_URL}/safari-pinned-tab.svg`,
        href: `${process.env.BASE_URL}/safari-pinned-tab.svg`,
      },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "192x192",
        url: `${process.env.BASE_URL}/android-chrome-192x192.png`,
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: `${process.env.BASE_URL}/android-chrome-512x512.png`,
      },
    ],
  },
  openGraph: {
    title: "Mono Resume",
    description:
      "Create a standout resume with Mono Resume, a clean and minimalist resume builder. Featuring a unique code-inspired look with monospace fonts, it helps tech professionals showcase their skills in style. Easy to use, customizable, and perfect for making a lasting impression in the digital age.",
    url: process.env.BASE_URL,
    siteName: "Mono Resume",
    locale: "en_IN",
    type: "website",
    images: [
      {
        type: "image/png",
        url: `${process.env.BASE_URL}/og.png`,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  manifest: `${process.env.BASE_URL}/site.webmanifest`,
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
