"use client";

import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="w-full min-h-[70vh] flex flex-col justify-center items-center text-center bg-background text-foreground px-6 py-20">
      <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
        Build Something Amazing with <span className="text-highlight">Padeco</span>
      </h1>

      <p className="max-w-2xl text-lg md:text-xl text-foreground/80 mb-10">
        Craft powerful digital products—from e-commerce apps to enterprise systems—with clean UI,
        speed, and seamless experiences.
      </p>

      <div className="flex gap-4">
        <Button className="bg-highlight text-background hover:opacity-90 px-6 py-3">
          Get Started
        </Button>
        <Button variant="outline" className="border-highlight text-highlight px-6 py-3 hover:bg-highlight/10">
          Learn More
        </Button>
      </div>
    </section>
  );
}
