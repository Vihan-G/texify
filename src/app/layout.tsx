import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "katex/dist/katex.min.css";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://texify-phi.vercel.app";
const TITLE = "texify — live LaTeX renderer";
const DESCRIPTION =
  "Type LaTeX, see it rendered instantly. Copy as PNG or share a link. No setup, no signup, no tracking.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s · texify",
  },
  description: DESCRIPTION,
  keywords: [
    "LaTeX",
    "KaTeX",
    "math",
    "formula",
    "renderer",
    "online",
    "copy as PNG",
    "share link",
  ],
  authors: [{ name: "Vihan Goenka", url: "https://github.com/Vihan-G" }],
  creator: "Vihan Goenka",
  openGraph: {
    type: "website",
    url: "/",
    siteName: "texify",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0f0f0f]">{children}</body>
    </html>
  );
}
