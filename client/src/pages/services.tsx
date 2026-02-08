import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  Server,
  LayoutDashboard,
  Wrench,
  ArrowRight,
  Shrub,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/animated-section";

const allServices = [
  {
    icon: Code2,
    title: "Frontend Development",
    text: "We craft clean, responsive, and animated user interfaces that feel fast, intuitive, and premium. Every UI is built to reflect your brand and improve user engagement.",
    features: [
      "Responsive Design",
      "Smooth Animations",
      "Performance Optimized",
      "Cross-Browser",
    ],
  },
  {
    icon: Server,
    title: "Full Stack Development",
    text: "We handle authentication, databases, APIs, and application logic to build secure and scalable products ready for real users.",
    features: [
      "Authentication Systems",
      "Database Design",
      "REST & GraphQL APIs",
      "Security Best Practices",
    ],
  },
  {
    icon: LayoutDashboard,
    title: "Custom Web Applications",
    text: "From dashboards to platforms, we build applications tailored exactly to your business workflow.",
    features: [
      "Admin Dashboards",
      "SaaS Platforms",
      "Business Tools",
      "Data Visualization",
    ],
  },
  {
    icon: Wrench,
    title: "Support & Maintenance",
    text: "We provide ongoing improvements, fixes, and optimizations after launch.",
    features: [
      "Bug Fixes",
      "Performance Tuning",
      "Feature Updates",
      "Security Patches",
    ],
  },
  {
    icon: Shrub,
    title: "Digital Marketing & Growth",
    text: "We help your product get discovered, ranked, and converted through data-driven digital strategies focused on long-term growth.",
    features: [
      "SEO Optimization",
      "Website Ranking Improvements",
      "Content & On-Page Strategy",
      "Traffic & Conversion Optimization",
    ],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <section
        className="relative pt-32 lg:pt-40 pb-20 overflow-hidden"
        data-testid="section-services-hero"
      >
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <span
              className="text-xs font-medium tracking-wider uppercase text-primary"
              data-testid="text-services-page-label"
            >
              Our Services
            </span>
            <h1
              className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight text-foreground"
              data-testid="text-services-page-heading"
            >
              What we build<span className="text-primary">.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              End-to-end web development services designed for startups and
              businesses that need more than just a website.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32" data-testid="section-services-list">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <StaggerChildren
            className="space-y-8 lg:space-y-12"
            staggerDelay={0.15}
          >
            {allServices.map((service, index) => (
              <StaggerItem key={service.title}>
                <Card
                  className="overflow-visible border-border/50 hover-elevate transition-all duration-300"
                  data-testid={`card-detail-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-0">
                    <div
                      className={`grid grid-cols-1 lg:grid-cols-2 gap-0 ${index % 2 !== 0 ? "lg:direction-rtl" : ""}`}
                    >
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center">
                            <service.icon className="w-6 h-6 text-primary" />
                          </div>
                          <span className="text-xs font-mono text-muted-foreground tracking-wider">
                            0{index + 1}
                          </span>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {service.text}
                        </p>
                      </div>
                      <div className="p-8 lg:p-12 bg-card/50 border-t lg:border-t-0 lg:border-l border-border flex items-center">
                        <div className="grid grid-cols-2 gap-4 w-full">
                          {service.features.map((feature) => (
                            <div
                              key={feature}
                              className="flex items-center gap-3"
                            >
                              <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                              <span className="text-sm text-foreground">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section
        className="py-24 lg:py-32 border-t border-border relative overflow-hidden"
        data-testid="section-services-cta"
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <AnimatedSection>
            <h2 className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Ready to get started?
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              Let's discuss your project and find the right solution for your
              business.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" data-testid="button-services-cta">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-we-work">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-services-how"
                >
                  See Our Process
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
