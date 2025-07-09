import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (heroRef.current) {
      const { left, top, width, height } =
        heroRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background pt-16 text-foreground"
    >
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>

      {/* Gradient orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/30 rounded-full blur-3xl opacity-50 animate-pulse"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: "transform 0.2s ease-out",
        }}
      ></div>
      <div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl opacity-50 animate-pulse delay-700"
        style={{
          transform: `translate(${-mousePosition.x * 20}px, ${-mousePosition.y * 20}px)`,
          transition: "transform 0.2s ease-out",
        }}
      ></div>

      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-12 py-16">
        <div className="w-full lg:w-1/2 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
              Accelerate Your
              <span className="relative whitespace-nowrap ml-2">
                <span className="relative z-10 text-foreground">Learning</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/30 rounded-sm -z-10"></span>
              </span>{" "}
              Journey
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-xl"
          >
            Master the skills that will propel your career to new heights with
            our personalized learning platform built for the modern
            professional.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/signup">
              <Button size="lg" className="h-12 px-8">
                Get Started
              </Button>
            </Link>
            <Link href="/learn">
              <Button size="lg" variant="outline" className="h-12 px-8">
                Explore Courses
              </Button>
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full lg:w-1/2 relative"
        >
          <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/20 border border-border/40 bg-card">
            <Image
              src="/image.png"
              alt="Students learning together"
              width={600}
              height={400}
              priority
              className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background/40 to-transparent mix-blend-overlay"></div>
          </div>
          <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/10 rounded-full blur-2xl"></div>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="bg-background/80 backdrop-blur-sm rounded-full p-3 border border-border/40 cursor-pointer hover:bg-primary/10 transition-colors"
        >
          <ChevronDown className="h-6 w-6 text-foreground" />
        </motion.div>
      </div>
    </div>
  );
}
