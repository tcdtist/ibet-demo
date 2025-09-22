import Link from "next/link";
import { Github, Twitter, Globe, Heart } from "lucide-react";

function BrandSection() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-sm font-bold">NS</span>
        </div>
        <span className="text-lg font-bold">NextSupaStarter</span>
      </div>
      <p className="text-sm text-muted-foreground max-w-xs">
        A modern Next.js starter template with Supabase, TailwindCSS, and
        TypeScript for rapid development.
      </p>
    </div>
  );
}

function QuickLinksSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Quick Links</h3>
      <nav className="flex flex-col space-y-2">
        <Link
          href="#features"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Features
        </Link>
        <Link
          href="#tech-stack"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Tech Stack
        </Link>
        <Link
          href="#get-started"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Get Started
        </Link>
      </nav>
    </div>
  );
}

function ResourcesSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Resources</h3>
      <nav className="flex flex-col space-y-2">
        <Link
          href="https://nextjs.org/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Next.js Docs
        </Link>
        <Link
          href="https://supabase.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Supabase Docs
        </Link>
        <Link
          href="https://tailwindcss.com/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          TailwindCSS Docs
        </Link>
        <Link
          href="https://bun.sh/docs"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Bun Docs
        </Link>
      </nav>
    </div>
  );
}

function SocialLinksSection() {
  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-foreground">Connect</h3>
      <div className="flex space-x-4">
        <Link
          href="https://github.com/tcdtist/igaming-demo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Github className="h-5 w-5" />
          <span className="sr-only">GitHub</span>
        </Link>
        <Link
          href="https://twitter.com/christhanhdang"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Twitter className="h-5 w-5" />
          <span className="sr-only">Twitter</span>
        </Link>
        <Link
          href="https://christhanhdang.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-foreground transition-colors"
        >
          <Globe className="h-5 w-5" />
          <span className="sr-only">Website</span>
        </Link>
      </div>
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="mt-8 border-t pt-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
        <span>© 2024 NextSupaStarter. Built with</span>
        <Heart className="h-4 w-4 text-red-500" />
        <span>for developers.</span>
      </div>
      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
        <Link href="#" className="hover:text-foreground transition-colors">
          Privacy Policy
        </Link>
        <Link href="#" className="hover:text-foreground transition-colors">
          Terms of Service
        </Link>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <BrandSection />
          <QuickLinksSection />
          <ResourcesSection />
          <SocialLinksSection />
        </div>
        <FooterBottom />
      </div>
    </footer>
  );
}
