import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { SupabaseProvider } from "@/lib/providers/supabase-provider";
import { getDefaultMetadata } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = getDefaultMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <JsonLd type="website" />
      </head>
      <body className="font-inter antialiased">
        <SupabaseProvider>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {children}
          </div>
        </SupabaseProvider>
      </body>
    </html>
  );
}
