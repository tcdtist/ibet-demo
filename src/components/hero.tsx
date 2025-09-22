import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Rocket } from "lucide-react";

function BadgeCTA() {
  return (
    <div className="mb-8 flex justify-center">
      <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-foreground/10 hover:ring-foreground/20 transition-all">
        🚀 Ready to ship in minutes.{" "}
        <Link href="#features" className="font-semibold text-primary">
          <span className="absolute inset-0" aria-hidden="true" />
          Learn more <ArrowRight className="inline h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function HeroTitle() {
  return (
    <h1 className="mb-8 text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
      Next.js + Supabase
      <br />
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
        Starter Template
      </span>
    </h1>
  );
}

function HeroDescription() {
  return (
    <p className="mx-auto mb-10 max-w-2xl text-xl text-muted-foreground">
      A modern, production-ready starter template with Next.js 14, Supabase,
      TailwindCSS, TypeScript, and Bun. Build and deploy faster than ever.
    </p>
  );
}

function HeroButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
      <Button size="lg" asChild>
        <Link href="#get-started">
          <Rocket className="mr-2 h-5 w-5" />
          Get Started
        </Link>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <Link
          href="https://github.com/your-username/igaming-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub
        </Link>
      </Button>
    </div>
  );
}

function FeatureItem({
  icon,
  title,
  description,
  iconWrapperClass,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  iconWrapperClass: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg ${iconWrapperClass}`}
      >
        {icon}
      </div>
      <h3 className="mb-2 text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function HeroFeatures() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
      <FeatureItem
        icon={<Zap className="h-6 w-6" />}
        title="Lightning Fast"
        description="Built with performance in mind using Next.js 14 and Bun runtime"
        iconWrapperClass="bg-blue-100 text-blue-600 dark:bg-blue-900/20"
      />
      <FeatureItem
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        }
        title="Production Ready"
        description="Complete with authentication, database, and deployment configurations"
        iconWrapperClass="bg-green-100 text-green-600 dark:bg-green-900/20"
      />
      <FeatureItem
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        title="Type Safe"
        description="Full TypeScript support with auto-generated database types"
        iconWrapperClass="bg-purple-100 text-purple-600 dark:bg-purple-900/20"
      />
    </div>
  );
}

export function Hero() {
  return (
    <section className="container mx-auto px-4 py-24 text-center">
      <div className="mx-auto max-w-4xl">
        <BadgeCTA />
        <HeroTitle />
        <HeroDescription />
        <HeroButtons />
        <HeroFeatures />
      </div>
    </section>
  );
}
