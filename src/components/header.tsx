"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Github, Zap } from "lucide-react";

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
        href="https://github.com/tcdtist/ibet-demo"
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
          href="https://github.com/tcdtist/ibet-demo"
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

function ActionButtons() {
  return (
    <>
      <Button asChild variant="outline" size="sm" className="hidden md:flex">
        <Link
          href="https://github.com/tcdtist/ibet-demo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github className="mr-2 h-4 w-4" />
          GitHub
        </Link>
      </Button>

      <Button asChild size="sm">
        <Link href="#get-started">Get Started</Link>
      </Button>
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
