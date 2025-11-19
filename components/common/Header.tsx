// components/common/Header.tsx
"use client";

import Link from "next/link";
import { Bars3Icon } from "@heroicons/react/24/outline";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "About Us", href: "#about" },
  { name: "Team", href: "#team" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-highlight">PADECO</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-foreground/80 transition-colors hover:text-highlight"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-highlight hover:bg-highlight/90 text-background" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Bars3Icon className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          <SheetContent side="right" className="w-80 pr-0">
            <SheetTitle className="sr-only">Main navigation menu</SheetTitle>

            <div className="flex flex-col space-y-6 pt-6">
              <Link href="/" className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-highlight">PADECO</span>
              </Link>

              <nav className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground/80 transition-colors hover:text-highlight"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <div className="flex flex-col space-y-3 pt-6 border-t border-border/40">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="lg" className="bg-highlight hover:bg-highlight/90 text-background" asChild>
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}