# Next.js + Supabase Starter Template

A modern, production-ready starter template with **Next.js 14**, **Supabase**, **TailwindCSS**, **TypeScript**, and **Bun**. Build and deploy web applications faster than ever.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green?style=for-the-badge&logo=supabase)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue?style=for-the-badge&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwind-css)
![Bun](https://img.shields.io/badge/Bun-Latest-f6dca4?style=for-the-badge&logo=bun)

## ✨ Features

- 🚀 **Next.js 14** with App Router, Server Components, and Streaming
- 🔥 **Supabase** integration with Authentication, Database, Storage, and Edge Functions
- 🎨 **TailwindCSS** with beautiful UI components and dark mode support
- 📘 **TypeScript** first with strict configuration and auto-generated database types
- ⚡ **Bun** for ultra-fast package management and runtime
- 🔒 **Authentication** with Supabase Auth (email/password + Google OAuth)
- 🛡️ **Protected Routes** with middleware and role-based access
- 👤 **User Management** with session handling and auth hooks
- 🗄️ **PostgreSQL** database with Row Level Security (RLS)
- 📁 **File Storage** with Supabase Storage integration
- 🌐 **SEO Optimized** with meta tags, sitemap, and structured data
- 🧪 **GitHub Actions** CI/CD pipeline
- 📱 **Responsive Design** with mobile-first approach
- 🎭 **Dark Mode** support
- 🔧 **Developer Tools** with ESLint, Prettier, and TypeScript

## 🚀 Quick Start

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- [Node.js](https://nodejs.org/) 18+ (as fallback)
- [Git](https://git-scm.com/)
- [Supabase Account](https://supabase.com/) (free tier available)

### 1. Use This Template

Click the "Use this template" button on GitHub or clone the repository:

```bash
git clone https://github.com/your-username/igaming-demo.git
cd igaming-demo
```

### 2. Install Dependencies

```bash
# Install with Bun (recommended)
bun install

# Or with npm
npm install
```

### 3. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to your project settings > API
3. Copy the environment variables:

```bash
# Copy the example environment file
cp .env.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### 4. Run Database Migrations

```bash
# Install Supabase CLI
bun add -g supabase

# Link to your project
supabase login
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### 5. Start Development Server

```bash
# Start with Bun
bun dev

# Or with npm
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application!

## 📁 Project Structure

```
igaming-demo/
├─ .github/
│  └─ workflows/
│     └─ ci.yml              # GitHub Actions CI/CD
├─ public/
│  └─ favicon.ico            # App favicon
├─ src/
│  ├─ app/                   # Next.js App Router
│  │  ├─ api/               # API routes
│  │  ├─ auth/              # Auth pages
│  │  │  └─ callback/       # OAuth callback
│  │  ├─ dashboard/         # User dashboard
│  │  ├─ admin/             # Admin panel
│  │  ├─ login/             # Login page
│  │  ├─ layout.tsx         # Root layout with SupabaseProvider
│  │  └─ page.tsx           # Home page
│  ├─ components/           # React components
│  │  ├─ ui/               # Reusable UI components
│  │  ├─ header.tsx        # Site header
│  │  ├─ hero.tsx          # Hero section
│  │  ├─ features.tsx      # Features section
│  │  ├─ tech-stack.tsx    # Tech stack section
│  │  ├─ cta.tsx           # Call to action
│  │  └─ footer.tsx        # Site footer
│  ├─ lib/                 # Utility functions
│  │  ├─ providers/        # React providers
│  │  │  └─ supabase-provider.tsx # Auth context provider
│  │  ├─ supabase.ts       # Supabase clients (SSR + Client)
│  │  ├─ database.types.ts # Database types
│  │  └─ utils.ts          # Helper functions
│  ├─ middleware.ts         # Route protection middleware
│  └─ styles/
│     └─ globals.css       # Global styles
├─ supabase/
│  ├─ migrations/          # Database migrations
│  ├─ functions/           # Edge Functions
│  ├─ config.toml         # Supabase config
│  └─ seed.sql            # Sample data
├─ .env.example            # Environment variables template
├─ .eslintrc.json         # ESLint configuration
├─ .gitignore             # Git ignore rules
├─ bun.lockb              # Bun lockfile
├─ next.config.js         # Next.js configuration
├─ package.json           # Dependencies and scripts
├─ postcss.config.js      # PostCSS configuration
├─ tailwind.config.ts     # Tailwind configuration
├─ tsconfig.json          # TypeScript configuration
└─ README.md              # Project documentation
```

## 🛠️ Available Scripts

```bash
# Development
bun dev          # Start development server
bun build        # Build for production
bun start        # Start production server
bun lint         # Run ESLint
bun lint:fix     # Fix ESLint errors
bun type-check   # Check TypeScript types

# Supabase
bunx supabase start      # Start local Supabase
bunx supabase stop       # Stop local Supabase
bunx supabase db reset   # Reset local database
bun run supabase:types   # Generate TypeScript types
```

## 🔧 Configuration

### Environment Variables

| Variable                        | Description                       | Required |
| ------------------------------- | --------------------------------- | -------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | Your Supabase project URL         | ✅       |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous key       | ✅       |
| `SUPABASE_SERVICE_ROLE_KEY`     | Your Supabase service role key    | 🟡       |
| `DATABASE_URL`                  | Direct database connection string | ❌       |

### Supabase Setup

1. **Authentication**: Pre-configured with email/password and social providers
2. **Database**: PostgreSQL with Row Level Security enabled
3. **Storage**: File upload and management
4. **Edge Functions**: Serverless functions for custom logic

## 🔐 Authentication Setup

This template comes with a complete authentication system built with Supabase Auth:

### Features

- ✅ Email/password authentication
- ✅ Google OAuth login
- ✅ Protected routes middleware
- ✅ Session management
- ✅ Auth hooks (`useUser`, `useLogin`, `useLogout`)
- ✅ Role-based access control
- ✅ Automatic redirects after login/logout

### Environment Variables for Auth

Create a `.env.local` file with the following variables:

```env
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Service role key for admin operations
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# Development
NODE_ENV=development
```

### Google OAuth Setup

To enable Google authentication:

1. Go to your Supabase dashboard > Authentication > Providers
2. Enable Google provider
3. Add your Google OAuth credentials:
   - Client ID
   - Client Secret
4. Set redirect URL: `https://your-domain.com/auth/callback`

### Protected Routes

The following routes are automatically protected:

- `/dashboard` - User dashboard (requires authentication)
- `/admin` - Admin panel (requires authentication)
- `/login` - Login page (redirects if already authenticated)

### Auth Pages

- **`/login`** - Login/signup form with email/password and Google OAuth
- **`/dashboard`** - User dashboard showing profile info
- **`/admin`** - Admin panel for system management
- **`/auth/callback`** - OAuth callback handler

### Using Auth Hooks

```tsx
import {
  useAuth,
  useUser,
  useLogin,
  useLogout,
} from "@/lib/providers/supabase-provider";

function MyComponent() {
  const { user, loading } = useAuth();
  const { login, loginWithGoogle } = useLogin();
  const logout = useLogout();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    return (
      <div>
        <button onClick={() => login("email@example.com", "password")}>
          Login with Email
        </button>
        <button onClick={loginWithGoogle}>Login with Google</button>
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {user.email}!</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### TailwindCSS

- Pre-configured with design system colors
- Dark mode support
- Custom animations and utilities
- Mobile-first responsive design

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on push

### Other Platforms

This template works with any platform that supports Next.js:

- **Netlify**: Add `next.config.js` with `output: 'export'` for static export
- **Railway**: Connect GitHub and add environment variables
- **Render**: Use Node.js environment with build command `bun run build`

## 📚 Tech Stack Details

### Frontend

- **Next.js 14**: React framework with App Router
- **React 18**: Latest React with Suspense and Server Components
- **TypeScript**: Type-safe JavaScript
- **TailwindCSS**: Utility-first CSS framework

### Backend

- **Supabase**: Backend-as-a-Service
- **PostgreSQL**: Open-source relational database
- **Row Level Security**: Database-level authorization
- **Edge Functions**: Serverless compute

### Development

- **Bun**: Fast JavaScript runtime and package manager
- **ESLint**: JavaScript/TypeScript linting
- **Prettier**: Code formatting
- **GitHub Actions**: CI/CD automation

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js Team](https://nextjs.org/) for the amazing framework
- [Supabase Team](https://supabase.com/) for the incredible backend platform
- [Tailwind CSS Team](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for seamless deployment platform
- [Bun Team](https://bun.sh/) for the fast JavaScript runtime

## 📞 Support

- 📚 [Next.js Documentation](https://nextjs.org/docs)
- 📘 [Supabase Documentation](https://supabase.com/docs)
- 🎨 [TailwindCSS Documentation](https://tailwindcss.com/docs)
- ⚡ [Bun Documentation](https://bun.sh/docs)

---

**Happy coding!** 🚀✨

Built with ❤️ for the developer community.
