"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Zap, User, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/lib/providers/supabase-provider";
import LogoutButton from "@/components/auth/LogoutButton";

function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
        <Zap className="h-5 w-5" />
      </div>
      <span className="text-xl font-bold">NextSupaStarter</span>
    </Link>
  );
}

function DesktopNav() {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <NavLink href="#features" label="Features" />
      <NavLink href="#tech-stack" label="Tech Stack" />
      <NavLink
        href="https://github.com/tcdtist/igaming-demo"
        label="GitHub"
        external
      />
    </nav>
  );
}

function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="md:hidden border-t bg-background">
      <nav className="container mx-auto flex flex-col space-y-4 px-4 py-4">
        <NavLink href="#features" label="Features" onClick={onClose} />
        <NavLink href="#tech-stack" label="Tech Stack" onClick={onClose} />
        <NavLink
          href="https://github.com/tcdtist/igaming-demo"
          label="GitHub"
          external
          onClick={onClose}
        />
      </nav>
    </div>
  );
}

function NavLink({
  href,
  label,
  external = false,
  onClick,
}: {
  href: string;
  label: string;
  external?: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      onClick={onClick}
    >
      {label}
    </Link>
  );
}

function AuthButtons() {
  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="outline" size="sm">
        <Link href="/login">
          <LogIn className="mr-2 h-4 w-4" />
          Login
        </Link>
      </Button>

      <Button asChild size="sm">
        <Link href="/signup">
          <UserPlus className="mr-2 h-4 w-4" />
          Sign Up
        </Link>
      </Button>
    </div>
  );
}

function UserMenu({ user }: { user: any }) {
  return (
    <div className="flex items-center space-x-2">
      <Button asChild variant="ghost" size="sm">
        <Link href="/dashboard">
          <User className="mr-2 h-4 w-4" />
          Dashboard
        </Link>
      </Button>

      <LogoutButton variant="outline" size="sm" />
    </div>
  );
}

function ActionButtons() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center space-x-2">
        <div className="animate-pulse bg-gray-200 h-8 w-16 rounded"></div>
        <div className="animate-pulse bg-gray-200 h-8 w-20 rounded"></div>
      </div>
    );
  }

  return (
    <>
      <Button asChild variant="outline" size="sm" className="hidden lg:flex">
        <Link
          href="https://github.com/tcdtist/igaming-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Link>
      </Button>

      {user ? <UserMenu user={user} /> : <AuthButtons />}
    </>
  );
}

function MobileToggleButton({
  isOpen,
  toggle,
}: {
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggle}>
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </Button>
  );
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Logo />
        <DesktopNav />
        <div className="flex items-center space-x-4">
          <ActionButtons />
          <MobileToggleButton isOpen={isMenuOpen} toggle={toggleMenu} />
        </div>
      </div>

      {isMenuOpen && <MobileNav onClose={() => setIsMenuOpen(false)} />}
    </header>
  );
}
