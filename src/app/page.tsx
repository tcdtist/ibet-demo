"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { TechStack } from "@/components/tech-stack";
import { CTA } from "@/components/cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorDescription = searchParams.get("error_description");

    // Handle authentication callback
    if (code) {
      // Redirect to auth callback handler
      const redirectTo = searchParams.get("redirectTo") || "/dashboard";
      router.push(
        `/auth/callback?code=${encodeURIComponent(
          code
        )}&redirectTo=${encodeURIComponent(redirectTo)}`
      );
      return;
    }

    // Handle auth errors
    if (error) {
      const errorMessage = errorDescription || error;
      router.push(`/login?error=${encodeURIComponent(errorMessage)}`);
      return;
    }
  }, [searchParams, router]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <TechStack />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
