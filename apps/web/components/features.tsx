import { motion } from "framer-motion";
import {
  CodeIcon,
  KeyIcon,
  DollarSignIcon,
  GraduationCapIcon,
  BrainIcon,
  BarChart2Icon,
} from "lucide-react";
import Image from "next/image";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function Features() {
  const features: Feature[] = [
    {
      icon: <CodeIcon className="h-6 w-6" />,
      title: "Interactive Learning",
      description:
        "Learn by doing with interactive exercises and real-world projects that reinforce concepts.",
    },
    {
      icon: <BrainIcon className="h-6 w-6" />,
      title: "AI-Powered Tutoring",
      description:
        "Get personalized assistance 24/7 with our advanced AI tutor that adapts to your learning style.",
    },
    {
      icon: <DollarSignIcon className="h-6 w-6" />,
      title: "Career Advancement",
      description:
        "Gain skills that employers value and track your progress toward career goals.",
    },
    {
      icon: <BarChart2Icon className="h-6 w-6" />,
      title: "Progress Tracking",
      description:
        "Monitor your progress with detailed analytics and visualizations to stay motivated.",
    },
    {
      icon: <GraduationCapIcon className="h-6 w-6" />,
      title: "Industry-Recognized Certificates",
      description:
        "Earn certificates that enhance your resume and demonstrate your expertise to employers.",
    },
    {
      icon: (
        <Image
          src="/globe.svg"
          alt="Community"
          width={24}
          height={24}
          className="h-6 w-6"
        />
      ),
      title: "Global Community",
      description:
        "Join a community of learners from around the world to collaborate and share knowledge.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground"
          >
            Why Choose Our Platform
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Discover the advantages that set our educational approach apart
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              whileHover={{ y: -8 }}
              className="bg-card border border-border/40 rounded-xl p-6 transition-all hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                {feature.title}
              </h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
