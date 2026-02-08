import { motion } from "framer-motion";
import { ArrowUpRight, Send, Mail, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertContactSchema } from "@shared/schema";
import { AnimatedSection } from "@/components/animated-section";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  description: z
    .string()
    .min(
      10,
      "Please provide a brief project description (at least 10 characters)",
    ),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      description: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormValues) => {
      const res = await apiRequest("POST", "/api/contact", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you within 24 hours.",
      });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or reach out directly via email.",
        variant: "destructive",
      });
    },
  });

  function onSubmit(data: ContactFormValues) {
    mutation.mutate(data);
  }

  return (
    <div className="min-h-screen">
      <section
        className="relative pt-32 lg:pt-40 pb-20 overflow-hidden"
        data-testid="section-contact-hero"
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
              data-testid="text-contact-label"
            >
              Contact
            </span>
            <h1
              className="mt-4 text-4xl lg:text-6xl font-bold tracking-tight text-foreground"
              data-testid="text-contact-heading"
            >
              Let's build your product<span className="text-primary">.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
              Tell us about your idea and we'll help you turn it into a scalable
              web solution.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 lg:py-32" data-testid="section-contact-form">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <AnimatedSection direction="left" className="lg:col-span-3">
              <Card className="overflow-visible border-border/50">
                <CardContent className="p-8 lg:p-10">
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              Name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your name"
                                {...field}
                                data-testid="input-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                                data-testid="input-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground font-medium">
                              Project Description
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Tell us about your project, goals, and timeline..."
                                className="resize-none min-h-[160px]"
                                {...field}
                                data-testid="input-description"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={mutation.isPending}
                        data-testid="button-submit-contact"
                      >
                        {mutation.isPending ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full"
                            />
                            Sending...
                          </>
                        ) : (
                          <>
                            Start Your Project
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection
              direction="right"
              delay={0.2}
              className="lg:col-span-2"
            >
              <div className="space-y-8 lg:pt-4">
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    Get in touch
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Fill out the form and we'll get back to you within 24 hours
                    with a clear plan and next steps.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Email us directly
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        prahaladh05@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Quick response
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        We reply within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <ArrowUpRight className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        Free consultation
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        No obligation, no strings attached
                      </p>
                    </div>
                  </div>
                </div>

                <Card className="overflow-visible border-primary/20 bg-primary/5">
                  <CardContent className="p-6">
                    <p className="text-sm font-medium text-foreground mb-2">
                      What happens next?
                    </p>
                    <ol className="space-y-2">
                      {[
                        "We review your project details",
                        "Schedule a quick discovery call",
                        "Deliver a clear proposal & timeline",
                      ].map((step, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-muted-foreground"
                        >
                          <span className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium text-primary flex-shrink-0">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </CardContent>
                </Card>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
  );
}
