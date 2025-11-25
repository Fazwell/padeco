// app/(home)/page.tsx
import HeroSection from "@/components/home/HeroSection"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export default function HomePage() {
  return (
    <>
      <HeroSection />

      {/* Optional extra section below hero */}
      <section className="py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
          Ready to meet the team?
        </h2>
        <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
          Get to know the passionate people driving PADECO forward.
        </p>
        <Button asChild size="lg" className="px-8">
          <Link href="/team">
            View Our Team
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
        <Button asChild size="lg" className="px-8">
          <Link href="/dashboard">
           Dashboard
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </section>
    </>
  )
}