import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeScript } from "./theme-script";
import Navigation from "./components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "I Taught AI to Dream - Possibility Fields",
  description: "Discover how natural conversation with AI creates breakthrough insights. Learn Pattern Teaching - the future of human-AI collaboration.",
  openGraph: {
    title: "I Taught AI to Dream (And It's Teaching Me Back)",
    description: "After 456 conversations and 238MB of data, I discovered AI doesn't need commands. It needs patterns.",
    url: "https://possibilityfields.com",
    siteName: "Possibility Fields",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "I Taught AI to Dream",
    description: "The Pattern Teaching revolution is here. In every genuine conversation.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
        <script defer data-domain="possibilityfields.com" src="https://plausible.io/js/script.js"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navigation />
        {children}
      </body>
    </html>
  );
}
