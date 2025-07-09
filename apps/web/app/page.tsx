"use client";

import { useClerk } from "@clerk/nextjs";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { FeaturedCourses } from "@/components/featured-courses";
import { Testimonials } from "@/components/testimonials";
import { Stats } from "@/components/stats";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";
import Container from "@/components/global/Container";

export default function Home() {
  const { signOut } = useClerk();

  const handleLogout = () => {
    signOut({
      redirectUrl: "/login",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground antialiased flex flex-col items-center">
      <Navbar className="w-full" />
      <main className="w-full flex flex-col items-center">
        <Hero />
        <Features />
        <HowItWorks />
        <FeaturedCourses />
        <Stats />
        <Testimonials />
        <CTASection />
      </main>
      <Footer className="w-full" />
    </div>
  );
}
