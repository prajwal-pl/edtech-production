"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, Variants } from "framer-motion";
import { useRef, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { useClerk } from "@clerk/nextjs";

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.6, 0.05, -0.01, 0.9],
    },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  return (
    <motion.div
      className={styles.featureCard}
      variants={fadeIn}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
      transition={{
        delay: index * 0.1,
      }}
    >
      <div className={styles.iconContainer}>
        <Image src={icon} alt={title} width={24} height={24} />
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </motion.div>
  );
};

export default function Home() {
  const { signOut } = useClerk();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (heroRef.current) {
      const { width, height, left, top } =
        heroRef.current.getBoundingClientRect();
      const x = (clientX - left) / width;
      const y = (clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  const handleLogout = () => {
    signOut({
      redirectUrl: "/login",
    });
  };

  return (
    <div className={styles.landingPage}>
      {/* Hero Section */}
      <div
        ref={heroRef}
        className={styles.hero}
        onMouseMove={handleMouseMove}
        style={{
          backgroundPosition: `${mousePosition.x * 10}% ${mousePosition.y * 10}%`,
        }}
      >
        <div className={styles.heroContent}>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className={styles.heroText}
          >
            <motion.h1 variants={fadeIn} transition={{ delay: 0.1 }}>
              Accelerate Your <span className={styles.highlight}>Learning</span>{" "}
              Journey
            </motion.h1>
            <motion.p variants={fadeIn} transition={{ delay: 0.2 }}>
              Master the skills that will propel your career to new heights with
              our personalized learning platform built for the modern
              professional.
            </motion.p>
            <motion.div
              variants={fadeIn}
              transition={{ delay: 0.3 }}
              className={styles.ctas}
            >
              <Link href="/signup">
                <Button className={styles.primary}>Get Started</Button>
              </Link>
              <Link href="/learn">
                <Button variant="outline" className={styles.secondary}>
                  Explore Courses
                </Button>
              </Link>
            </motion.div>
          </motion.div>
          <motion.div
            className={styles.heroImage}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              src="/hero-image.jpg"
              alt="Students learning together"
              width={600}
              height={400}
              priority
              className={styles.image}
            />
            <div className={styles.heroGlow}></div>
          </motion.div>
        </div>

        <div className={styles.scrollIndicator}>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <Image
              src="/arrow-up-circle.svg"
              width={40}
              height={40}
              alt="Scroll down"
              className={styles.scrollIcon}
            />
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <section className={styles.features}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2>Why Choose Our Platform</h2>
          <p>Discover the advantages that set our educational approach apart</p>
        </motion.div>

        <div className={styles.featureGrid}>
          <FeatureCard
            icon="/code.svg"
            title="Interactive Learning"
            description="Learn by doing with interactive exercises and real-world projects that reinforce concepts."
            index={0}
          />
          <FeatureCard
            icon="/key.svg"
            title="AI-Powered Tutoring"
            description="Get personalized assistance 24/7 with our advanced AI tutor that adapts to your learning style."
            index={1}
          />
          <FeatureCard
            icon="/dollar.svg"
            title="Career Advancement"
            description="Gain skills that employers value and track your progress toward career goals."
            index={2}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.stats}>
        <div className={styles.statContainer}>
          <motion.div
            className={styles.statItem}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h3>97%</h3>
            <p>Satisfaction Rate</p>
          </motion.div>
          <motion.div
            className={styles.statItem}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3>10K+</h3>
            <p>Active Learners</p>
          </motion.div>
          <motion.div
            className={styles.statItem}
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3>500+</h3>
            <p>Courses Available</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <motion.div
          className={styles.ctaContent}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Transform Your Learning Experience?</h2>
          <p>
            Join thousands of professionals already accelerating their careers
            with our platform.
          </p>
          <div className={styles.ctaButtons}>
            <Link href="/signup">
              <Button size="lg" className={styles.primary}>
                Get Started for Free
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              onClick={handleLogout}
              className={styles.outlineBtn}
            >
              Log Out
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          <div className={styles.footerLogo}>
            <Image
              src="/turborepo-light.svg"
              alt="Logo"
              width={150}
              height={40}
            />
            <p>Empowering education through technology</p>
          </div>
          <div className={styles.footerLinks}>
            <div className={styles.linkColumn}>
              <h4>Platform</h4>
              <Link href="/learn">Courses</Link>
              <Link href="/projects">Projects</Link>
              <Link href="/career">Career Path</Link>
              <Link href="/tutor">AI Tutor</Link>
            </div>
            <div className={styles.linkColumn}>
              <h4>Company</h4>
              <Link href="/about">About Us</Link>
              <Link href="/contact">Contact</Link>
              <Link href="/careers">Careers</Link>
              <Link href="/blog">Blog</Link>
            </div>
            <div className={styles.linkColumn}>
              <h4>Legal</h4>
              <Link href="/terms">Terms</Link>
              <Link href="/privacy">Privacy</Link>
              <Link href="/cookies">Cookies</Link>
            </div>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>© 2025 EdTech Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
