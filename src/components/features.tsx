import {
  Database,
  Shield,
  Zap,
  Palette,
  Code,
  Gauge,
  Users,
  FileImage,
  CloudLightning,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    title: "Next.js 14 App Router",
    description:
      "Latest Next.js features with server components, streaming, and optimized routing.",
    icon: Zap,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    title: "Supabase Integration",
    description:
      "Complete backend with PostgreSQL, real-time subscriptions, and edge functions.",
    icon: Database,
    color: "text-green-600 dark:text-green-400",
  },
  {
    title: "Authentication Ready",
    description:
      "Built-in auth with social providers, email/password, and row-level security.",
    icon: Shield,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    title: "TailwindCSS + UI",
    description:
      "Beautiful, responsive design system with dark mode and custom components.",
    icon: Palette,
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    title: "TypeScript First",
    description:
      "Full type safety with auto-generated database types and strict configurations.",
    icon: Code,
    color: "text-indigo-600 dark:text-indigo-400",
  },
  {
    title: "Bun Runtime",
    description:
      "Ultra-fast package management and runtime for optimal development experience.",
    icon: Gauge,
    color: "text-orange-600 dark:text-orange-400",
  },
  {
    title: "User Management",
    description:
      "Profile management, user roles, and social authentication out of the box.",
    icon: Users,
    color: "text-cyan-600 dark:text-cyan-400",
  },
  {
    title: "File Storage",
    description:
      "Secure file uploads with Supabase Storage and optimized image handling.",
    icon: FileImage,
    color: "text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Edge Functions",
    description:
      "Serverless functions deployed globally for maximum performance.",
    icon: CloudLightning,
    color: "text-violet-600 dark:text-violet-400",
  },
];

function SectionHeading() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Everything You Need to Build Modern Apps
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
        A comprehensive starter template with all the tools and configurations
        you need for rapid development and deployment.
      </p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  description,
  color,
}: {
  icon: any;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <Card className="relative overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-background shadow-sm border">
            <Icon className={`h-5 w-5 ${color}`} />
          </div>
          <CardTitle className="text-lg">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <CardDescription className="text-base">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}

function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          title={feature.title}
          description={feature.description}
          color={feature.color}
        />
      ))}
    </div>
  );
}

export function Features() {
  return (
    <section id="features" className="container mx-auto px-4 py-24">
      <SectionHeading />
      <FeatureGrid />
    </section>
  );
}
