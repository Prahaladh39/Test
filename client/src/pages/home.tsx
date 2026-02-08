import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  Code2,
  Server,
  TrendingUp,
  CheckCircle2,
  Zap,
  Shield,
  Users,
  Headphones,
} from "lucide-react";
import {
  SiReact,
  SiNodedotjs,
  SiFirebase,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AnimatedSection,
  StaggerChildren,
  StaggerItem,
} from "@/components/animated-section";

const services = [
  {
    icon: Code2,
    title: "Frontend Development",
    text: "High-performance, responsive, and animated interfaces designed to convert users into customers.",
  },
  {
    icon: Server,
    title: "Full Stack Development",
    text: "Secure, scalable backend systems with authentication, databases, APIs, and real-world business logic.",
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Growth",
    text: "From SEO optimization to performance tuning, we help your website rank better, reach the right audience, and convert users into customers.",
  },
];

const whyChooseUs = [
  { icon: Zap, text: "Custom-built solutions, not templates" },
  { icon: Users, text: "Clear communication & documentation" },
  { icon: Shield, text: "Scalable architecture from day one" },
  { icon: TrendingUp, text: "Performance-focused builds" },
  { icon: Headphones, text: "Long-term support mindset" },
];

const techStack = [
  { icon: SiReact, label: "React" },
  { icon: SiNodedotjs, label: "Node.js" },
  { icon: SiFirebase, label: "Firebase" },
  { icon: SiTypescript, label: "TypeScript" },
  { icon: SiTailwindcss, label: "Tailwind" },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        data-testid="section-hero"
      >
        <div className="absolute inset-0 grid-bg" />
        <div className="absolute inset-0 hero-gradient" />

        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "1.5s" }}
        />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20 lg:pt-40 lg:pb-32">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-primary border border-primary/20 rounded-full bg-primary/5"
                data-testid="badge-hero-label"
              >
                <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                Web Development Studio
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight leading-[1.1] text-foreground"
              data-testid="text-hero-headline"
            >
              We design and build{" "}
              <span className="text-primary">scalable web experiences</span> for
              modern businesses.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              data-testid="text-hero-subtext"
            >
              We're a two-founder web development studio combining clean
              frontend, strong backend, and growth-focused digital strategy to
              turn ideas into real products.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/contact">
                <Button size="lg" data-testid="button-hero-start">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/how-we-work">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-hero-how"
                >
                  How We Work
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1.5"
            >
              <motion.div className="w-1 h-2 bg-muted-foreground/50 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section
        className="py-24 lg:py-32 relative"
        data-testid="section-what-we-do"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16 lg:mb-20">
            <span
              className="text-xs font-medium tracking-wider uppercase text-primary"
              data-testid="text-services-label"
            >
              What We Do
            </span>
            <h2
              className="mt-4 text-3xl lg:text-5xl font-bold tracking-tight text-foreground"
              data-testid="text-services-heading"
            >
              Everything you need to launch
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
              From concept to production, we handle the full spectrum of web
              development.
            </p>
          </AnimatedSection>

          <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {services.map((service) => (
              <StaggerItem key={service.title}>
                <Card
                  className="group relative overflow-visible border-border/50 bg-card hover-elevate transition-all duration-300 h-full"
                  data-testid={`card-service-${service.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <CardContent className="p-8">
                    <div className="w-12 h-12 rounded-md bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      {service.text}
                    </p>
                  </CardContent>
                </Card>
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </section>

      <section className="py-24 lg:py-32 relative" data-testid="section-why-us">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <AnimatedSection direction="left">
              <span className="text-xs font-medium tracking-wider uppercase text-primary">
                Why Choose Us
              </span>
              <h2 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
                Built different,
                <br />
                by design.
              </h2>
              <p className="mt-6 text-muted-foreground text-lg leading-relaxed">
                We're not a large agency. We're a focused, two-person team that
                treats every project like our own product.
              </p>
            </AnimatedSection>

            <StaggerChildren className="space-y-4">
              {whyChooseUs.map((item) => (
                <StaggerItem key={item.text}>
                  <div
                    className="flex items-start gap-4 p-4 rounded-md hover-elevate transition-all"
                    data-testid={`item-why-${item.text.substring(0, 20).toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-foreground font-medium">{item.text}</p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerChildren>
          </div>
        </div>
      </section>

      <section
        className="py-24 lg:py-32 border-t border-border"
        data-testid="section-tech"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <span className="text-xs font-medium tracking-wider uppercase text-primary">
              Tech & Tools
            </span>
            <h2 className="mt-4 text-3xl lg:text-5xl font-bold tracking-tight text-foreground">
              Modern stack, proven results
            </h2>
          </AnimatedSection>

          <StaggerChildren className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
            {techStack.map((tech) => (
              <StaggerItem key={tech.label}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="flex flex-col items-center gap-3 group cursor-default"
                  data-testid={`icon-tech-${tech.label.toLowerCase()}`}
                >
                  <div className="w-16 h-16 rounded-md bg-card border border-border flex items-center justify-center transition-colors group-hover:border-primary/30">
                    <tech.icon className="w-7 h-7 text-muted-foreground transition-colors group-hover:text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                    {tech.label}
                  </span>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerChildren>

          <AnimatedSection className="flex items-center justify-center gap-4 mt-8">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>APIs</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>Cloud Hosting</span>
            </div>
            <span className="text-border">|</span>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>CI/CD</span>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <section
        className="py-24 lg:py-32 relative overflow-hidden"
        data-testid="section-final-cta"
      >
        <div className="absolute inset-0 hero-gradient" />
        <div className="absolute inset-0 grid-bg" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <AnimatedSection className="text-center">
            <h2
              className="text-3xl lg:text-5xl font-bold tracking-tight text-foreground max-w-3xl mx-auto"
              data-testid="text-final-cta"
            >
              Let's build something that actually{" "}
              <span className="text-primary">scales.</span>
            </h2>
            <p className="mt-6 text-muted-foreground text-lg max-w-xl mx-auto">
              We're ready when you are. Tell us about your project and let's
              turn your idea into reality.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" data-testid="button-final-cta">
                  Start Your Project
                  <ArrowUpRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link href="/services">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-explore-services"
                >
                  Explore Services
                </Button>
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
