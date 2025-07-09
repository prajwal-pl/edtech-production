import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface Course {
  id: string;
  title: string;
  category: string;
  description: string;
  rating: number;
  reviewCount: number;
  isBestseller?: boolean;
  isNew?: boolean;
  color: string;
}

export function FeaturedCourses() {
  const courses: Course[] = [
    {
      id: "full-stack-web-development",
      title: "Full-Stack Web Development Bootcamp",
      category: "Web Development",
      description:
        "Master frontend and backend technologies to build complete web applications",
      rating: 5,
      reviewCount: 483,
      isBestseller: true,
      color: "bg-primary/10 text-primary",
    },
    {
      id: "data-science-fundamentals",
      title: "Data Science Fundamentals",
      category: "Data Science",
      description:
        "Learn Python, statistics and machine learning for data analysis",
      rating: 4,
      reviewCount: 327,
      color: "bg-green-500/10 text-green-500",
    },
    {
      id: "ai-fundamentals",
      title: "Artificial Intelligence Fundamentals",
      category: "AI & Machine Learning",
      description:
        "Build intelligent systems and understand the latest AI developments",
      rating: 5,
      reviewCount: 189,
      isNew: true,
      color: "bg-amber-500/10 text-amber-500",
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
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-foreground"
          >
            Popular Courses
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-lg"
          >
            Start your learning journey with our top-rated courses
          </motion.p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {courses.map((course) => (
            <motion.div
              key={course.id}
              variants={item}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Card className="h-full flex flex-col overflow-hidden border border-border/40">
                <div className="h-48 relative overflow-hidden bg-muted">
                  <div
                    className={`absolute inset-0 ${course.color.split(" ")[0]} opacity-30`}
                  ></div>
                  {course.isBestseller && (
                    <span className="absolute top-4 right-4 text-xs font-medium bg-amber-500 text-white px-2 py-1 rounded-full">
                      Bestseller
                    </span>
                  )}
                  {course.isNew && (
                    <span className="absolute top-4 right-4 text-xs font-medium bg-blue-500 text-white px-2 py-1 rounded-full">
                      New
                    </span>
                  )}
                </div>
                <CardHeader className="p-6 pb-2">
                  <div
                    className={`text-sm font-medium ${course.color} inline-block px-2.5 py-0.5 rounded-full mb-2`}
                  >
                    {course.category}
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {course.title}
                  </h3>
                </CardHeader>
                <CardContent className="p-6 pt-2 flex-grow">
                  <p className="text-muted-foreground">{course.description}</p>
                </CardContent>
                <CardFooter className="p-6 pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={
                            i < course.rating ? "text-amber-500" : "text-muted"
                          }
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      ({course.reviewCount})
                    </span>
                  </div>
                  <Link href={`/learn/${course.id}`}>
                    <Button size="sm" variant="secondary">
                      View Course
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex justify-center mt-12">
          <Link href="/learn">
            <Button variant="outline" className="group">
              View All Courses
              <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
