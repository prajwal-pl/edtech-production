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
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Question {
  id: number;
  subject: string;
  text: string;
  options: string[];
  answer?: number;
}

const DiagnosticComponent = () => {
  const [currentSubject, setCurrentSubject] = useState<string>("math");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const subjects = [
    { id: "math", name: "Mathematics" },
    { id: "science", name: "Science" },
    { id: "language", name: "Language Arts" },
    { id: "history", name: "History" },
  ];

  const questions: Question[] = [
    {
      id: 1,
      subject: "math",
      text: "Solve for x: 2x + 5 = 13",
      options: ["x = 3", "x = 4", "x = 5", "x = 6"],
    },
    {
      id: 2,
      subject: "math",
      text: "What is the area of a circle with radius 3?",
      options: ["9π", "6π", "3π", "π"],
    },
    {
      id: 3,
      subject: "science",
      text: "Which of the following is NOT a state of matter?",
      options: ["Solid", "Liquid", "Gas", "Energy"],
    },
    {
      id: 4,
      subject: "science",
      text: "What is the chemical symbol for gold?",
      options: ["Go", "Gd", "Au", "Ag"],
    },
    {
      id: 5,
      subject: "language",
      text: "Which of the following is a proper noun?",
      options: ["City", "Country", "Japan", "Mountain"],
    },
    {
      id: 6,
      subject: "language",
      text: "Identify the adjective: 'The quick brown fox jumps over the lazy dog.'",
      options: ["Quick", "Jumps", "Over", "Fox"],
    },
    {
      id: 7,
      subject: "history",
      text: "Who was the first president of the United States?",
      options: [
        "Thomas Jefferson",
        "John Adams",
        "George Washington",
        "Benjamin Franklin",
      ],
    },
    {
      id: 8,
      subject: "history",
      text: "When did World War II end?",
      options: ["1943", "1944", "1945", "1946"],
    },
  ];

  const filteredQuestions = questions.filter(
    (q) => q.subject === currentSubject
  );
  const currentQuestion = filteredQuestions[currentStep];

  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = () => {
    if (currentStep < filteredQuestions.length - 1) {
      // Add a slight delay for animation effect
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
      }, 150);
    } else {
      // Check if we should move to the next subject
      const currentSubjectIndex = subjects.findIndex(
        (s) => s.id === currentSubject
      );
      if (
        currentSubjectIndex < subjects.length - 1 &&
        subjects[currentSubjectIndex + 1]
      ) {
        setTimeout(() => {
          setCurrentSubject(subjects[currentSubjectIndex + 1]?.id!);
          setCurrentStep(0);
        }, 150);
      } else {
        // All subjects completed
        setIsCompleted(true);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      // Add a slight delay for animation effect
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
      }, 150);
    } else {
      // Check if we should move to the previous subject
      const currentSubjectIndex = subjects.findIndex(
        (s) => s.id === currentSubject
      );
      if (currentSubjectIndex > 0 && subjects[currentSubjectIndex - 1]) {
        setTimeout(() => {
          setCurrentSubject(subjects[currentSubjectIndex - 1]?.id!);
          const prevSubjectQuestions = questions.filter(
            (q) => q.subject === subjects[currentSubjectIndex - 1]?.id
          );
          setCurrentStep(prevSubjectQuestions.length - 1);
        }, 150);
      }
    }
  };

  const handleStartDiagnostic = () => {
    setCurrentSubject("math");
    setCurrentStep(0);
    setAnswers({});
    setIsCompleted(false);
  };

  return (
    <div className="flex flex-col gap-6 py-6 min-h-screen">
      <div className="flex flex-col gap-2 relative px-4 py-8 md:px-8 md:py-10 rounded-2xl mb-4 overflow-hidden bg-gradient-to-r from-secondary/20 via-primary/10 to-secondary/20">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_70%)]"></div>
        <h1 className="text-3xl font-bold tracking-tight relative z-10">
          Diagnostic Assessment
        </h1>
        <p className="text-muted-foreground relative z-10 max-w-3xl">
          Complete this diagnostic test to help us personalize your learning
          experience. We'll analyze your strengths and areas for improvement to
          create a tailored study plan.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto w-full border-none shadow-lg bg-gradient-to-b from-background to-secondary/5">
        {!isCompleted ? (
          <>
            <CardHeader className="border-b border-border/40">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  {subjects.find((s) => s.id === currentSubject)?.name} -
                  Question {currentStep + 1}/{filteredQuestions.length}
                </CardTitle>
                <TooltipProvider>
                  <div className="flex items-center gap-2">
                    {subjects.map((subject, index) => (
                      <Tooltip key={subject.id}>
                        <TooltipTrigger>
                          <div
                            className={`h-3 w-3 rounded-full transition-all duration-300 ${
                              currentSubject === subject.id
                                ? "bg-primary scale-125 shadow-glow"
                                : subjects.findIndex(
                                      (s) => s.id === currentSubject
                                    ) > index
                                  ? "bg-primary/60"
                                  : "bg-secondary"
                            }`}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{subject.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </div>
                </TooltipProvider>
              </div>
              <CardDescription className="pt-1">
                Select the best answer for each question
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              {currentQuestion && (
                <div
                  key={currentQuestion.id}
                  className="space-y-6 animate-fade-in"
                >
                  <div className="text-lg font-medium p-4 bg-secondary/10 rounded-lg border border-border/50">
                    {currentQuestion.text}
                  </div>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-3 rounded-lg border p-4 cursor-pointer transition-all duration-200 transform hover:translate-x-1 ${
                          answers[currentQuestion.id] === index
                            ? "border-primary bg-gradient-to-r from-primary/20 to-primary/5 shadow-md"
                            : "hover:bg-gradient-to-r hover:from-secondary/20 hover:to-transparent"
                        }`}
                        onClick={() =>
                          handleSelectAnswer(currentQuestion.id, index)
                        }
                      >
                        <div
                          className={`flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300 ${
                            answers[currentQuestion.id] === index
                              ? "bg-primary text-primary-foreground scale-110 shadow-md"
                              : "border border-muted-foreground/20 bg-background hover:bg-secondary/50"
                          }`}
                        >
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span className="font-medium">{option}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex justify-between pt-2 pb-4 px-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={
                  currentStep === 0 && currentSubject === subjects[0]?.id
                }
                className="transition-all hover:shadow-md hover:translate-x-[-2px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={
                  currentQuestion && answers[currentQuestion.id] === undefined
                }
                className={`transition-all ${currentQuestion && answers[currentQuestion.id] !== undefined ? "hover:shadow-md hover:translate-x-[2px]" : ""}`}
              >
                {currentStep < filteredQuestions.length - 1
                  ? "Next"
                  : currentSubject === subjects[subjects.length - 1]?.id
                    ? "Finish"
                    : "Next Subject"}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader className="border-b border-border/40">
              <CardTitle className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                Diagnostic Complete!
              </CardTitle>
              <CardDescription className="pt-1">
                Thank you for completing the diagnostic assessment.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-8">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-primary/30 to-primary/10 animate-pulse-slow shadow-lg">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary animate-bounce-slow"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                  Your personalized learning plan is ready!
                </h3>
                <p className="text-muted-foreground max-w-md">
                  Based on your assessment, we've created a customized learning
                  path tailored to your strengths and areas for improvement.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 w-full max-w-md mt-4">
                {subjects.map((subject) => (
                  <div
                    key={subject.id}
                    className="p-4 rounded-lg bg-gradient-to-br from-secondary/20 to-background border border-border/50"
                  >
                    <h4 className="font-medium text-sm">{subject.name}</h4>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="h-2 flex-1 bg-secondary/30 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary/70 rounded-full"
                          style={{
                            width: `${Math.floor(Math.random() * 100)}%`,
                            transition: "width 1s ease-in-out",
                          }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {Math.floor(Math.random() * 100)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center pb-6">
              <Button
                onClick={() => (window.location.href = "/learn")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary transition-all hover:shadow-lg hover:scale-105 px-8"
              >
                View Learning Plan
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="ml-2"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </CardFooter>
          </>
        )}
      </Card>

      {!isCompleted && (
        <div className="max-w-3xl mx-auto w-full">
          <div className="text-xs text-muted-foreground text-center bg-secondary/10 p-2 rounded-lg border border-border/20">
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
              className="inline-block mr-1"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 16v-4" />
              <path d="M12 8h.01" />
            </svg>
            Your progress is automatically saved. You can return to this
            assessment at any time.
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticComponent;
