import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Navbar({ className }: { className?: string }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/40 text-foreground",
        className
      )}
    >
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/turborepo-light.svg"
            alt="EdTech Logo"
            width={120}
            height={30}
            className="dark:invert"
          />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/learn"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Courses
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Projects
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/career"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            Career
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
          <Link
            href="/tutor"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors relative group"
          >
            AI Tutor
            <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login">
            <Button variant="ghost" className="text-sm text-foreground">
              Log in
            </Button>
          </Link>
          <Link href="/signup">
            <Button className="text-sm">Sign up</Button>
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
