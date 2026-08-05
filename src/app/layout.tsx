import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
});

const cairo = Cairo({
  variable: "--font-arabic",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Elfares Merchandising Platform",
  description: "Merchandising & Retail Execution Platform by HG Communication",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cairo.variable}`}>
      <body className="min-h-screen">
        <div>{children}</div>
      </body>
    </html>
  );
}
