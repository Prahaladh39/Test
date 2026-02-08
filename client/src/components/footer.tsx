import { Link } from "wouter";
import { ArrowUpRight } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "How We Work", href: "/how-we-work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer
      className="border-t border-border bg-background"
      data-testid="footer"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div className="md:col-span-1">
            <span className="text-xl font-bold tracking-tight text-foreground">
              VegaDevs<span className="text-primary">.</span>
            </span>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed max-w-xs">
              A two-founder web development studio building scalable, premium
              web experiences for modern businesses.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Navigation
            </h4>
            <ul className="space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span
                      className="text-sm text-muted-foreground transition-colors cursor-pointer flex items-center gap-1 group"
                      data-testid={`link-footer-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 invisible group-hover:visible" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4 tracking-wide uppercase">
              Get in Touch
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ready to start your next project? Reach out and let's talk about
              building something great together.
            </p>
            <Link href="/contact">
              <span
                className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-primary cursor-pointer"
                data-testid="link-footer-contact-cta"
              >
                Start a Project
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} VegaDevs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Designed & built with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
