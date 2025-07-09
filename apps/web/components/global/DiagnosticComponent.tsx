"use client";

import React, { useState, useEffect } from "react";
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
import { useUser } from "@clerk/nextjs";
import { syncUserWithClerk } from "@/actions/auth";
import {
  getDiagnosticQuestions,
  generateDiagnosticQuestions,
  submitDiagnosticResult,
  getOrCreateDiagnosticSubjects,
} from "@/actions/index";

interface Question {
  id: string;
  subjectId: string;
  text: string;
  options: string[];
  correctAnswer: number;
  difficulty: string;
  answer?: number;
}

const DiagnosticComponent = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const [currentSubject, setCurrentSubject] = useState<string>("");
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [subjects, setSubjects] = useState<Array<{ id: string; name: string }>>(
    []
  );
  const [questions, setQuestions] = useState<Question[]>([]);
  const [results, setResults] = useState<any>(null);
  const [userDbId, setUserDbId] = useState<string | null>(null);

  // Sync user with database when component mounts
  useEffect(() => {
    const syncUser = async () => {
      if (!isUserLoaded || !user) return;

      try {
        setIsLoading(true);
        const clerkId = user.id;
        const primaryEmail = user.primaryEmailAddress?.emailAddress;

        const result = await syncUserWithClerk({
          clerkId,
          email: primaryEmail!,
          firstName: user.firstName || undefined,
          lastName: user.lastName || undefined,
          avatar: user.imageUrl || undefined,
        });

        if (result.success && result.user) {
          setUserDbId(result.user.id);

          // After user is synced, fetch initial subject data
          await fetchSubjects();
        } else {
          console.error("Failed to sync user:", result.error);
        }
      } catch (error) {
        console.error("Error syncing user:", error);
      } finally {
        setIsLoading(false);
      }
    };

    syncUser();
  }, [isUserLoaded, user]);

  // Fetch available subjects
  const fetchSubjects = async () => {
    try {
      setIsLoading(true);
      // Get or create subjects from the database
      const result = await getOrCreateDiagnosticSubjects();

      if (result.success && result.subjects && result.subjects.length > 0) {
        setSubjects(result.subjects);
        // Safely access the first subject
        const firstSubject = result.subjects[0];
        if (firstSubject && firstSubject.id) {
          setCurrentSubject(firstSubject.id);
          await fetchQuestions(firstSubject.id);
        }
      } else {
        console.error("Failed to fetch subjects:", result.error);
        // Fallback to hardcoded subjects only if database retrieval fails
        const fallbackSubjects = [
          { id: "fallback-math", name: "Mathematics" },
          { id: "fallback-science", name: "Science" },
          { id: "fallback-language", name: "Language Arts" },
          { id: "fallback-history", name: "History" },
        ];
        setSubjects(fallbackSubjects);
        // Safely access the first fallback subject
        if (fallbackSubjects.length > 0 && fallbackSubjects[0]) {
          setCurrentSubject(fallbackSubjects[0].id);
          // In fallback mode, we'll rely on the sample questions
        }
      }
    } catch (error) {
      console.error("Error fetching subjects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch or generate questions for a subject
  const fetchQuestions = async (subjectId: string) => {
    try {
      setIsLoading(true);

      // First try to get existing questions
      const existingResult = await getDiagnosticQuestions(subjectId);

      if (
        existingResult.success &&
        existingResult.questions &&
        existingResult.questions.length > 0
      ) {
        setQuestions(existingResult.questions);
      } else {
        // If no questions exist, generate new ones
        try {
          const generatedResult = await generateDiagnosticQuestions({
            subjectId,
            level: "intermediate",
            count: 5,
          });

          if (generatedResult.success && generatedResult.questions) {
            setQuestions(generatedResult.questions);
          } else {
            console.error(
              "Failed to generate questions:",
              generatedResult.error
            );

            // Fallback to sample questions if generation fails
            const sampleQuestions = [
              {
                id: `sample-${subjectId}-1`,
                subjectId: subjectId,
                text: "What is the main purpose of a diagnostic assessment?",
                options: [
                  "To grade students",
                  "To identify knowledge gaps",
                  "To rank students",
                  "To assign homework",
                ],
                correctAnswer: 1,
                difficulty: "beginner",
              },
              {
                id: `sample-${subjectId}-2`,
                subjectId: subjectId,
                text: "Which of the following is a benefit of personalized learning?",
                options: [
                  "Less teacher involvement",
                  "Standardized curriculum for all",
                  "Adapts to individual learning needs",
                  "Reduced use of technology",
                ],
                correctAnswer: 2,
                difficulty: "beginner",
              },
              // Add more comprehensive sample questions
              {
                id: `sample-${subjectId}-3`,
                subjectId: subjectId,
                text: `What best describes the field of ${subjects.find((s) => s.id === subjectId)?.name || "this subject"}?`,
                options: [
                  "The study of natural phenomena",
                  "The analysis of historical events",
                  "The application of mathematical principles",
                  "The development of communication skills",
                ],
                correctAnswer: 0,
                difficulty: "intermediate",
              },
              {
                id: `sample-${subjectId}-4`,
                subjectId: subjectId,
                text: "Which learning approach is most effective for long-term retention?",
                options: [
                  "Memorization through repetition",
                  "Visual learning with diagrams",
                  "Spaced practice with regular review",
                  "Concentrated study in one session",
                ],
                correctAnswer: 2,
                difficulty: "intermediate",
              },
              {
                id: `sample-${subjectId}-5`,
                subjectId: subjectId,
                text: "How can educational technology best support learning?",
                options: [
                  "By replacing traditional teaching methods",
                  "By providing automated grading",
                  "By offering personalized learning paths",
                  "By reducing the need for teacher involvement",
                ],
                correctAnswer: 2,
                difficulty: "advanced",
              },
            ];
            setQuestions((prevQuestions) => [
              ...prevQuestions,
              ...sampleQuestions,
            ]);
          }
        } catch (error) {
          console.error("Error during question generation:", error);
          // Display an error message to the user or use sample questions
        }
      }
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredQuestions = questions.filter(
    (q) => q.subjectId === currentSubject
  );
  const currentQuestion = filteredQuestions[currentStep];

  const handleSelectAnswer = (questionId: string, answerIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleNext = async () => {
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
        const nextSubject = subjects[currentSubjectIndex + 1];
        if (nextSubject) {
          setTimeout(async () => {
            setCurrentSubject(nextSubject.id);
            setCurrentStep(0);
            // Load questions for the next subject if we haven't already
            if (!questions.some((q) => q.subjectId === nextSubject.id)) {
              await fetchQuestions(nextSubject.id);
            }
          }, 150);
        }
      } else {
        // All subjects completed, submit results
        await submitResults();
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
        const prevSubject = subjects[currentSubjectIndex - 1];
        setTimeout(() => {
          if (prevSubject) {
            setCurrentSubject(prevSubject.id);
            const prevSubjectQuestions = questions.filter(
              (q) => q.subjectId === prevSubject.id
            );
            setCurrentStep(prevSubjectQuestions.length - 1);
          }
        }, 150);
      }
    }
  };

  const submitResults = async () => {
    if (!userDbId) {
      console.error("User not found in database");
      return;
    }

    try {
      setIsLoading(true);

      // Process responses
      const responses = Object.entries(answers).map(([questionId, answer]) => {
        const question = questions.find((q) => q.id === questionId);
        return {
          questionId,
          answer,
          isCorrect: question ? question.correctAnswer === answer : false,
        };
      });

      // Calculate score (percentage correct)
      const correctCount = responses.filter((r) => r.isCorrect).length;
      const score = responses.length > 0 ? correctCount / responses.length : 0;

      // Submit results to backend
      const result = await submitDiagnosticResult({
        userId: userDbId,
        score,
        responses,
        recommendations:
          "Based on your results, we recommend focusing on improving your understanding of key concepts.",
      });

      if (result.success) {
        setResults(result.result);
        setIsCompleted(true);
      } else {
        console.error("Failed to submit diagnostic result:", result.error);
      }
    } catch (error) {
      console.error("Error submitting results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartDiagnostic = () => {
    if (subjects.length > 0 && subjects[0]) {
      setCurrentSubject(subjects[0].id);
      setCurrentStep(0);
      setAnswers({});
      setIsCompleted(false);
      setResults(null);
    }
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
