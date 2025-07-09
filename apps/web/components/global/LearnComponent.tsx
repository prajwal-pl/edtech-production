"use client";
import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface LessonModule {
  id: string;
  title: string;
  description: string;
  units: Lesson[];
  completed: number;
  total: number;
}

interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: string;
  status: "completed" | "in-progress" | "locked";
  difficulty: "beginner" | "intermediate" | "advanced";
}

const LearnComponent = () => {
  const [selectedModule, setSelectedModule] = useState<string>("math");

  const modules: LessonModule[] = [
    {
      id: "math",
      title: "Mathematics",
      description: "Core mathematical concepts and problem-solving skills",
      completed: 8,
      total: 24,
      units: [
        {
          id: "math-1",
          title: "Algebra Foundations",
          description:
            "Learn the fundamentals of algebraic expressions and equations",
          duration: "45 min",
          status: "completed",
          difficulty: "beginner",
        },
        {
          id: "math-2",
          title: "Linear Equations",
          description: "Understand how to solve and graph linear equations",
          duration: "60 min",
          status: "completed",
          difficulty: "beginner",
        },
        {
          id: "math-3",
          title: "Quadratic Equations",
          description: "Master solving and graphing quadratic equations",
          duration: "75 min",
          status: "in-progress",
          difficulty: "intermediate",
        },
        {
          id: "math-4",
          title: "Polynomial Functions",
          description:
            "Explore higher-degree polynomial functions and their properties",
          duration: "90 min",
          status: "locked",
          difficulty: "advanced",
        },
      ],
    },
    {
      id: "science",
      title: "Science",
      description: "Scientific principles and experimental methods",
      completed: 5,
      total: 20,
      units: [
        {
          id: "science-1",
          title: "Scientific Method",
          description:
            "Learn the process of scientific inquiry and experimentation",
          duration: "30 min",
          status: "completed",
          difficulty: "beginner",
        },
        {
          id: "science-2",
          title: "Forces and Motion",
          description: "Understand Newton's laws and mechanics",
          duration: "60 min",
          status: "in-progress",
          difficulty: "intermediate",
        },
        {
          id: "science-3",
          title: "Energy and Work",
          description:
            "Explore different forms of energy and energy transformations",
          duration: "45 min",
          status: "locked",
          difficulty: "intermediate",
        },
      ],
    },
    {
      id: "language",
      title: "Language Arts",
      description: "Reading comprehension, writing, and communication skills",
      completed: 12,
      total: 15,
      units: [
        {
          id: "language-1",
          title: "Grammar Essentials",
          description: "Master the fundamentals of English grammar",
          duration: "40 min",
          status: "completed",
          difficulty: "beginner",
        },
        {
          id: "language-2",
          title: "Essay Writing",
          description: "Learn effective essay structure and argumentation",
          duration: "90 min",
          status: "completed",
          difficulty: "intermediate",
        },
      ],
    },
  ];

  const selectedModuleData = modules.find((m) => m.id === selectedModule);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
      case "intermediate":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20";
      case "advanced":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20";
      default:
        return "bg-primary/10 text-primary hover:bg-primary/20";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge variant="default">Completed</Badge>;
      case "in-progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "locked":
        return <Badge variant="outline">Locked</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col gap-6 py-6 min-h-screen">
      <div className="flex flex-col gap-2 relative px-4 py-8 md:px-8 md:py-10 rounded-2xl mb-4 overflow-hidden bg-gradient-to-r from-chart-3/10 via-chart-2/10 to-chart-3/10">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          Learning Dashboard
        </h1>
        <p className="text-muted-foreground relative z-10 max-w-3xl">
          Your personalized learning path based on your diagnostic results.
          Explore modules tailored to your skill level and learning style.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="border-b">
              <CardTitle>Learning Modules</CardTitle>
              <CardDescription>
                Select a module to begin learning
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col">
                {modules.map((module) => (
                  <button
                    key={module.id}
                    className={`flex flex-col gap-1.5 border-b p-5 text-left transition-all last:border-b-0 relative group overflow-hidden ${
                      selectedModule === module.id ? "bg-accent/50" : ""
                    }`}
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-transparent group-hover:from-transparent group-hover:to-primary/5 transition-all duration-500"></div>
                    <div className="flex items-center justify-between relative z-10">
                      <span className="font-medium group-hover:text-primary transition-colors duration-300">
                        {module.title}
                      </span>
                      <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {module.completed}/{module.total}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground relative z-10">
                      {module.description}
                    </div>
                    <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary relative">
                      <div className="absolute inset-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgcGF0dGVyblRyYW5zZm9ybT0icm90YXRlKDQ1KSI+PHBhdGggZD0iTTAgMjBoMjBWMEgweiIgZmlsbD0iY3VycmVudENvbG9yIiBmaWxsLW9wYWNpdHk9IjAuMSIvPjxwYXRoIGQ9Ik0wIDEwaDIwdjEwSDB6IiBmaWxsPSJjdXJyZW50Q29sb3IiIGZpbGwtb3BhY2l0eT0iMC4xIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2EpIiAvPjwvc3ZnPg==')]"></div>
                      <div
                        className="h-full bg-gradient-to-r from-primary/70 to-primary relative z-10 group-hover:shadow-[0_0_12px_0_var(--primary)] transition-all duration-300"
                        style={{
                          width: `${(module.completed / module.total) * 100}%`,
                        }}
                      />
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-card to-card/80">
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <CardTitle>{selectedModuleData?.title}</CardTitle>
                <Badge
                  variant="outline"
                  className="bg-primary/10 hover:bg-primary/20 transition-colors"
                >
                  {selectedModuleData?.completed}/{selectedModuleData?.total}{" "}
                  Completed
                </Badge>
              </div>
              <CardDescription>
                {selectedModuleData?.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5">
              <div className="space-y-4">
                {selectedModuleData?.units.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`rounded-xl border p-5 transition-all relative group overflow-hidden ${
                      lesson.status === "locked"
                        ? "opacity-70"
                        : "cursor-pointer hover:shadow-md hover:border-primary/20"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br from-transparent to-transparent ${
                        lesson.status !== "locked"
                          ? "group-hover:to-primary/5"
                          : ""
                      } transition-all duration-500`}
                    ></div>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lesson.title}</span>
                          {getStatusBadge(lesson.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {lesson.description}
                        </p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <circle cx="12" cy="12" r="10" />
                              <polyline points="12 6 12 12 16 14" />
                            </svg>
                            {lesson.duration}
                          </div>
                          <div
                            className={`rounded-full px-2 py-0.5 text-xs ${getDifficultyColor(lesson.difficulty)}`}
                          >
                            {lesson.difficulty.charAt(0).toUpperCase() +
                              lesson.difficulty.slice(1)}
                          </div>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant={
                          lesson.status === "completed" ? "outline" : "default"
                        }
                        disabled={lesson.status === "locked"}
                      >
                        {lesson.status === "completed"
                          ? "Review"
                          : lesson.status === "in-progress"
                            ? "Continue"
                            : "Start"}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => (window.location.href = "/diagnostic")}
              >
                Retake Diagnostic
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnComponent;
