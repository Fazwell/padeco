// app/(public)/team/page.tsx  or  app/team/page.tsx
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import Image from "next/image"

const team = [
  {
    name: "Dianne",
    surname: "Russell",
    title: "Co-Founder & CEO",
    image: "/team/dianne.jpg",
  },
  {
    name: "Mike",
    surname: "Fisher",
    title: "Co-Founder & CFO",
    image: "/team/mike.jpg",
  },
  {
    name: "Wade",
    surname: "Warren",
    title: "Co-Founder & CTO",
    image: "/team/wade.jpg",
  },
  {
    name: "Esther",
    surname: "Howard",
    title: "Vice President",
    image: "/team/esther.jpg",
  },
]

export default function TeamPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-card to-muted/50 overflow-hidden">
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        <div className="container relative z-10 px-6 md:px-12 lg:px-20 text-center max-w-5xl">
          <p className="text-sm md:text-base text-muted-foreground tracking-widest uppercase mb-4">
            Our Team
          </p>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground leading-tight">
            Meet our Team
          </h1>
          <p className="mt-6 text-3xl md:text-5xl font-medium text-primary">
            Passionate. Proactive. Expert.
          </p>
          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We lead with care — our core value — and a shared passion for connecting the world-class talent with transformative opportunities.
          </p>

          {/* Navigation Arrows */}
          <div className="flex justify-center gap-6 mt-20">
            <Button size="icon" variant="outline" className="rounded-full h-14 w-14 border-2">
              <ArrowLeft className="h-6 w-6" />
            </Button>
            <Button size="icon" variant="outline" className="rounded-full h-14 w-14 border-2">
              <ArrowRight className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-24 px-6 md:px-12 lg:px-20 bg-background">
        <div className="container max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {team.map((member) => (
              <div
                key={member.name}
                className="group cursor-pointer text-center space-y-6 transition-all duration-500"
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">
                  <div className="aspect-square relative bg-gradient-to-br from-muted/50 to-muted">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={`${member.name} ${member.surname}`}
                      fill
                      className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                    {/* Subtle overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {member.name}{" "}
                    <span className="text-primary font-bold">{member.surname}</span>
                  </h3>
                  <p className="text-muted-foreground text-sm tracking-wide">
                    {member.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}