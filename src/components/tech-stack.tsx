import Image from "next/image";

const technologies = [
  {
    name: "Next.js 14",
    description: "React framework with App Router",
    logo: "https://assets.vercel.com/image/upload/v1662130559/nextjs/Icon_dark_background.png",
    color: "bg-black",
  },
  {
    name: "Supabase",
    description: "Backend as a Service",
    logo: "data:image/jpeg;base64,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",
    color: "bg-green-500",
  },
  {
    name: "TailwindCSS",
    description: "Utility-first CSS framework",
    logo: "https://tailwindcss.com/_next/static/media/tailwindcss-mark.d52e9897.svg",
    color: "bg-cyan-500",
  },
  {
    name: "TypeScript",
    description: "Typed JavaScript",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg",
    color: "bg-blue-600",
  },
  {
    name: "Bun",
    description: "Fast JavaScript runtime",
    logo: "https://bun.sh/logo.svg",
    color: "bg-orange-500",
  },
  {
    name: "PostgreSQL",
    description: "Open source database",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg",
    color: "bg-blue-800",
  },
];

function SectionTitle() {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
        Modern Tech Stack
      </h2>
      <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
        Built with the latest and greatest technologies for performance,
        developer experience, and scalability.
      </p>
    </div>
  );
}

function TechCard({
  name,
  description,
  logo,
}: {
  name: string;
  description: string;
  logo: string;
}) {
  return (
    <div className="group flex flex-col items-center space-y-4 rounded-lg p-6 transition-all hover:bg-background hover:shadow-lg">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-background shadow-sm transition-transform group-hover:scale-110">
        <div className="h-10 w-10 overflow-hidden rounded-lg flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700">
          <Image src={logo} alt={name} width={40} height={40} />
        </div>
      </div>
      <div className="text-center">
        <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}

function TechGrid() {
  return (
    <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
      {technologies.map((tech, index) => (
        <TechCard
          key={index}
          name={tech.name}
          description={tech.description}
          logo={tech.logo}
        />
      ))}
    </div>
  );
}

function FeatureCard({
  title,
  description,
  iconWrapperClass,
  icon,
}: {
  title: string;
  description: string;
  iconWrapperClass: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="text-center">
      <div
        className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg ${iconWrapperClass}`}
      >
        {icon}
      </div>
      <h4 className="font-semibold text-foreground">{title}</h4>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  );
}

function AdditionalFeatures() {
  return (
    <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
      <FeatureCard
        title="ESLint + Prettier"
        description="Code formatting and linting"
        iconWrapperClass="bg-blue-100 text-blue-600 dark:bg-blue-900/20"
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
      <FeatureCard
        title="GitHub Actions"
        description="CI/CD automation"
        iconWrapperClass="bg-green-100 text-green-600 dark:bg-green-900/20"
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
      <FeatureCard
        title="SEO Optimized"
        description="Meta tags and sitemap"
        iconWrapperClass="bg-purple-100 text-purple-600 dark:bg-purple-900/20"
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
      />
      <FeatureCard
        title="Developer Tools"
        description="Hot reload and debugging"
        iconWrapperClass="bg-orange-100 text-orange-600 dark:bg-orange-900/20"
        icon={
          <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        }
      />
    </div>
  );
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      className="container mx-auto px-4 py-24 bg-muted/50"
    >
      <SectionTitle />
      <TechGrid />
      <AdditionalFeatures />
    </section>
  );
}
