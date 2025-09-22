import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Next.js Supabase Starter",
  description:
    "A modern Next.js starter with Supabase, TailwindCSS, TypeScript, and Bun",
  keywords: [
    "Next.js",
    "Supabase",
    "TailwindCSS",
    "TypeScript",
    "Bun",
    "React",
  ],
  authors: [{ name: "Next.js Supabase Starter" }],
  creator: "Next.js Supabase Starter",
  metadataBase: new URL("https://your-domain.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://your-domain.com",
    title: "Next.js Supabase Starter",
    description:
      "A modern Next.js starter with Supabase, TailwindCSS, TypeScript, and Bun",
    siteName: "Next.js Supabase Starter",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Next.js Supabase Starter",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js Supabase Starter",
    description:
      "A modern Next.js starter with Supabase, TailwindCSS, TypeScript, and Bun",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="font-inter antialiased">
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          {children}
        </div>
      </body>
    </html>
  );
}
