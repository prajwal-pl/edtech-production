import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Footer({ className }: { className?: string }) {
  return (
    <footer className={cn("bg-muted/40 border-t border-border", className)}>
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/turborepo-light.svg"
                alt="EdTech Logo"
                width={150}
                height={40}
                className="dark:invert"
              />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-md">
              Empowering education through technology. Our platform connects
              learners with the skills they need to thrive in today's rapidly
              evolving workplace.
            </p>
            <div className="flex gap-4">
              <Link
                href="https://twitter.com"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path
                    d="M22 4.01C21 4.5 20.02 4.84 19 5C18.2 4.12 17.05 3.5 15.85 3.5C13.58 3.5 11.65 5.42 11.65 7.69C11.65 8.01 11.69 8.31 11.76 8.61C8.32 8.44 5.21 6.74 3.01 4.16C2.66 4.78 2.47 5.5 2.47 6.27C2.47 7.73 3.19 9.03 4.28 9.82C3.55 9.8 2.86 9.61 2.26 9.28V9.33C2.26 11.32 3.76 12.97 5.69 13.35C5.35 13.44 5 13.5 4.62 13.5C4.37 13.5 4.12 13.47 3.88 13.42C4.38 15.04 5.9 16.21 7.68 16.24C6.25 17.33 4.47 17.97 2.54 17.97C2.22 17.97 1.9 17.95 1.59 17.91C3.39 19.07 5.5 19.74 7.77 19.74C15.84 19.74 20.24 13.57 20.24 8.2C20.24 8.02 20.23 7.83 20.22 7.65C21.22 6.93 22.08 6.04 22.75 5.01L22 4.01Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                href="https://linkedin.com"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path
                    d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
              <Link
                href="https://github.com"
                className="p-2 rounded-full bg-background hover:bg-primary/10 transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.166 8.839 21.489C9.339 21.581 9.52 21.284 9.52 21.017C9.52 20.777 9.512 20.061 9.508 19.193C6.726 19.79 6.139 17.819 6.139 17.819C5.685 16.642 5.028 16.346 5.028 16.346C4.132 15.705 5.097 15.718 5.097 15.718C6.094 15.79 6.628 16.761 6.628 16.761C7.52 18.332 8.97 17.867 9.54 17.609C9.629 16.935 9.889 16.47 10.175 16.204C7.954 15.936 5.619 15.079 5.619 11.292C5.619 10.169 6.01 9.255 6.648 8.546C6.547 8.294 6.199 7.309 6.748 5.986C6.748 5.986 7.587 5.716 9.497 6.955C10.313 6.73 11.182 6.618 12.047 6.614C12.909 6.618 13.778 6.73 14.595 6.955C16.503 5.716 17.341 5.986 17.341 5.986C17.891 7.309 17.543 8.294 17.442 8.546C18.082 9.255 18.47 10.169 18.47 11.292C18.47 15.089 16.13 15.933 13.903 16.195C14.263 16.523 14.587 17.174 14.587 18.164C14.587 19.56 14.574 20.684 14.574 21.017C14.574 21.286 14.753 21.586 15.261 21.487C19.234 20.162 22.096 16.416 22.096 12C22.096 6.477 17.619 2 12.096 2H12Z"
                    fill="currentColor"
                  />
                </svg>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 text-foreground">
              Platform
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/learn"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Courses
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/career"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Career Path
                </Link>
              </li>
              <li>
                <Link
                  href="/tutor"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  AI Tutor
                </Link>
              </li>
              <li>
                <Link
                  href="/diagnostic"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Skills Diagnostic
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 text-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-sm mb-3 text-foreground">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-sm text-muted-foreground">
              © 2025 EdTech Platform. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <form className="flex gap-2 w-full max-w-sm">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="h-9"
                />
                <Button size="sm">Subscribe</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
