import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight, Sparkles, FileBarChart2, BarChart4 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      id: 1,
      icon: <FileBarChart2 className="h-6 w-6" />,
      title: "Take the Diagnostic",
      description:
        "Start by assessing your current skill level with our comprehensive diagnostic test. We'll identify your strengths and areas for improvement.",
      link: "/diagnostic",
      linkText: "Start Assessment",
    },
    {
      id: 2,
      icon: <Sparkles className="h-6 w-6" />,
      title: "Follow Your Learning Path",
      description:
        "Based on your diagnostic results, we'll create a personalized learning path with courses and projects tailored to your goals.",
      link: "/learn",
      linkText: "Explore Paths",
    },
    {
      id: 3,
      icon: <BarChart4 className="h-6 w-6" />,
      title: "Track Your Progress",
      description:
        "Monitor your growth with detailed analytics and progress tracking. Get AI-powered recommendations for continuous improvement.",
      link: "/dashboard",
      linkText: "View Dashboard",
    },
  ];

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background/0 pointer-events-none"></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Our simple three-step process to advance your skills and career
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/70 to-primary/30"></div>
          <div className="hidden md:block absolute top-24 right-1/3 w-1/3 h-0.5 bg-gradient-to-r from-primary/30 to-primary/70"></div>

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-card border border-border/40 rounded-xl p-8 h-full flex flex-col hover:shadow-lg hover:shadow-primary/5 transition-all">
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-6">
                  {step.icon}
                </div>
                <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                  {step.id}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground mb-6 flex-grow">
                  {step.description}
                </p>
                <Link href={step.link} className="mt-auto">
                  <Button variant="outline" size="sm" className="group">
                    {step.linkText}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
