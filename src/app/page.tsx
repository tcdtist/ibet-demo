import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { TechStack } from "@/components/tech-stack";
import { CTA } from "@/components/cta";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function HomePage() {
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
