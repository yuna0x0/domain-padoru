import localFont from "next/font/local";
import type { Metadata } from "next";
import "./globals.css";

const Avenir = localFont({ src: "./fonts/Avenir.woff2" });

export const metadata: Metadata = {
  title: "yuna0x0 Domain Parking",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script async defer src="/umami" type="text/javascript" />
      </head>
      <body className={Avenir.className}>{children}</body>
    </html>
  );
}
