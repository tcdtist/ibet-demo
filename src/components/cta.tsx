import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Download, Github } from "lucide-react";

function CTAHeading() {
  return (
    <>
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-6">
        Ready to Build Something Amazing?
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-muted-foreground mb-10">
        Get started with our production-ready template and ship your next
        project in record time. Everything is configured and ready to go.
      </p>
    </>
  );
}

function CTAButtons() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center mb-12">
      <Button size="lg" asChild>
        <Link
          href="https://github.com/tcdtist/igaming-demo/generate"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Download className="mr-2 h-5 w-5" />
          Use This Template
        </Link>
      </Button>
      <Button variant="outline" size="lg" asChild>
        <Link
          href="https://github.com/tcdtist/igaming-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="mr-2 h-5 w-5" />
          View on GitHub
        </Link>
      </Button>
    </div>
  );
}

function CTASteps() {
  const steps = [
    {
      title: "Clone & Install",
      description: (
        <>
          Use the template and run{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">
            bun install
          </code>
        </>
      ),
    },
    {
      title: "Configure Supabase",
      description: (
        <>
          Add your Supabase URL and keys to{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">
            .env.local
          </code>
        </>
      ),
    },
    {
      title: "Start Building",
      description: (
        <>
          Run{" "}
          <code className="bg-muted px-1 py-0.5 rounded text-xs">bun dev</code>{" "}
          and start building your app
        </>
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3 text-left">
      {steps.map((step, index) => (
        <div key={index} className="flex items-start space-x-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-semibold">
            {index + 1}
          </div>
          <div>
            <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
            <p className="text-sm text-muted-foreground">{step.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function CTAIncluded() {
  const items = [
    "Authentication with Supabase Auth",
    "Database with PostgreSQL & RLS",
    "File storage with Supabase Storage",
    "Serverless functions (Edge Functions)",
    "Beautiful UI components",
    "TypeScript configuration",
    "GitHub Actions CI/CD",
    "SEO optimization",
  ];

  return (
    <div className="mt-12 p-6 rounded-lg bg-muted/50 border">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        What&apos;s Included?
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-muted-foreground">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center">
            <ArrowRight className="h-4 w-4 mr-2 text-green-500" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CTA() {
  return (
    <section id="get-started" className="container mx-auto px-4 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <CTAHeading />
        <CTAButtons />
        <CTASteps />
        <CTAIncluded />
      </div>
    </section>
  );
}
