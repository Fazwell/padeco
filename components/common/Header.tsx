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
  { name: "Team", href: "/team" },
  { name: "Services", href: "#services" },
  { name: "Pricing", href: "#pricing" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6 md:px-12 lg:px-20">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-highlight tracking-tight">PADECO</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/auth/signin">Sign In</Link>
          </Button>
          <Button size="sm" className="bg-highlight hover:bg-highlight/90 text-background" asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Bars3Icon className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>

          {/* ONLY THIS PART CHANGED — added generous, comfortable padding */}
          <SheetContent 
            side="right" 
            className="w-80 sm:w-96 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 px-10 pt-12 pb-10"
          >
            <SheetTitle className="sr-only">Navigation</SheetTitle>

            <div className="flex h-full flex-col justify-between">
              {/* Top Section */}
              <div className="space-y-12">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                  <span className="text-3xl font-bold text-highlight">PADECO</span>
                </Link>

                {/* Navigation Links */}
                <nav className="space-y-9">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block text-2xl font-medium text-foreground/90 hover:text-highlight transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Bottom Section - Buttons */}
              <div className="space-y-4 pt-12 border-t border-border/40">
                <Button variant="outline" size="lg" className="w-full justify-center text-lg py-7" asChild>
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button size="lg" className="w-full justify-center text-lg py-7 bg-highlight hover:bg-highlight/90 text-background" asChild>
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