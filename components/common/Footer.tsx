// components/common/Footer.tsx
import Link from "next/link";
// ← All heroicons imports are commented out for now
// import {
//   TwitterLogo,
//   LinkedinLogo,
//   GithubLogo,
//   InstagramLogo,
//   FacebookLogo,
//   EnvelopeClosedIcon,
// } from "@heroicons/react/24/solid";

const navigation = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Team", href: "#team" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
  ],
  services: [
    { name: "Consulting", href: "#services" },
    { name: "Development", href: "#" },
    { name: "Design", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ],
  // Social icons completely commented out until you need them
  // social: [
  //   { name: "X (Twitter)", href: "https://x.com/yourhandle", icon: /* X SVG */ },
  //   { name: "Instagram", href: "https://instagram.com/yourhandle", icon: InstagramLogo },
  //   { name: "Facebook", href: "https://facebook.com/yourpage", icon: FacebookLogo },
  //   { name: "WhatsApp", href: "https://wa.me/1234567890", icon: /* WhatsApp SVG */ },
  // ],
};

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container max-w-7xl px-4 py-12 md:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-6">
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-highlight">PADECO</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-foreground/70">
              Building the future with precision, passion, and a touch of yellow.
            </p>

            {/* Social icons section – fully commented out */}
            {/* <div className="mt-6 flex gap-4">
              {navigation.social.map((item) => {
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-10 w-10 items-center justify-center rounded-lg bg-muted/50 transition-all hover:bg-highlight hover:text-background"
                    aria-label={`Follow us on ${item.name}`}
                  >
                    {Icon}
                  </a>
                );
              })}
            </div> */}
          </div>

          {/* Company, Services, Legal columns – unchanged */}
          <div>
            <h3 className="font-semibold text-foreground">Company</h3>
            <ul className="mt-4 space-y-3">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-foreground/70 transition-colors hover:text-highlight">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Services</h3>
            <ul className="mt-4 space-y-3">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-foreground/70 transition-colors hover:text-highlight">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <h3 className="font-semibold text-foreground">Legal</h3>
            <ul className="mt-4 space-y-3">
              {navigation.legal.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-sm text-foreground/70 transition-colors hover:text-highlight">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/40 pt-8 text-center text-sm text-foreground/60">
          <p>
            © {new Date().getFullYear()} PADECO. All rights reserved. Made with{" "}
            <span className="text-highlight">Yellow</span> and a lot of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
}