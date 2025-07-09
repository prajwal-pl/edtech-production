"use server";

import db from "../lib/prisma";
import {
  EducationLevel,
  EnrollmentStatus,
  MessageSender,
  NotificationType,
  ProgressStatus,
  ProjectStatus,
  ProjectStepStatus,
  TutorSessionStatus,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateDiagnosticContent } from "./ai";

// =====================
// USER RELATED ACTIONS
// =====================

/**
 * Create a new user
 */
export async function createUser(data: {
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
  educationLevel?: EducationLevel;
  bio?: string;
  teamId?: string;
}) {
  try {
    const user = await db.user.create({
      data,
    });
    return { success: true, user };
  } catch (error) {
    console.error("Failed to create user:", error);
    return { success: false, error: "Failed to create user" };
  }
}

/**
 * Get user by ID
 */
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: {
        team: true,
        enrollments: {
          include: {
            module: {
              include: {
                subject: true,
              },
            },
          },
        },
        progress: {
          include: {
            lesson: true,
          },
        },
      },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Failed to get user:", error);
    return { success: false, error: "Failed to get user" };
  }
}

/**
 * Update user profile
 */
export async function updateUserProfile(
  id: string,
  data: {
    firstName?: string;
    lastName?: string;
    displayName?: string;
    avatar?: string;
    educationLevel?: EducationLevel;
    bio?: string;
    teamId?: string;
  }
) {
  try {
    const user = await db.user.update({
      where: { id },
      data,
    });
    revalidatePath("/settings");
    revalidatePath("/dashboard");
    return { success: true, user };
  } catch (error) {
    console.error("Failed to update user profile:", error);
    return { success: false, error: "Failed to update user profile" };
  }
}

/**
 * Delete user
 */
export async function deleteUser(id: string) {
  try {
    await db.user.delete({
      where: { id },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to delete user:", error);
    return { success: false, error: "Failed to delete user" };
  }
}

// =====================
// TEAM RELATED ACTIONS
// =====================

/**
 * Create a new team
 */
export async function createTeam(data: {
  name: string;
  logo?: string;
  plan?: string;
}) {
  try {
    const team = await db.team.create({
      data,
    });
    return { success: true, team };
  } catch (error) {
    console.error("Failed to create team:", error);
    return { success: false, error: "Failed to create team" };
  }
}

/**
 * Get team by ID
 */
export async function getTeamById(id: string) {
  try {
    const team = await db.team.findUnique({
      where: { id },
      include: {
        users: true,
      },
    });
    return { success: true, team };
  } catch (error) {
    console.error("Failed to get team:", error);
    return { success: false, error: "Failed to get team" };
  }
}

/**
 * Update team
 */
export async function updateTeam(
  id: string,
  data: {
    name?: string;
    logo?: string;
    plan?: string;
  }
) {
  try {
    const team = await db.team.update({
      where: { id },
      data,
    });
    revalidatePath("/settings");
    return { success: true, team };
  } catch (error) {
    console.error("Failed to update team:", error);
    return { success: false, error: "Failed to update team" };
  }
}

/**
 * Add user to team
 */
export async function addUserToTeam(userId: string, teamId: string) {
  try {
    const user = await db.user.update({
      where: { id: userId },
      data: { teamId },
    });
    return { success: true, user };
  } catch (error) {
    console.error("Failed to add user to team:", error);
    return { success: false, error: "Failed to add user to team" };
  }
}

// =====================
// SUBJECT RELATED ACTIONS
// =====================

/**
 * Get all subjects
 */
export async function getAllSubjects() {
  try {
    const subjects = await db.subject.findMany({
      include: {
        modules: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });
    return { success: true, subjects };
  } catch (error) {
    console.error("Failed to get subjects:", error);
    return { success: false, error: "Failed to get subjects" };
  }
}

/**
 * Get subject by ID
 */
export async function getSubjectById(id: string) {
  try {
    const subject = await db.subject.findUnique({
      where: { id },
      include: {
        modules: {
          orderBy: {
            order: "asc",
          },
          include: {
            lessons: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });
    return { success: true, subject };
  } catch (error) {
    console.error("Failed to get subject:", error);
    return { success: false, error: "Failed to get subject" };
  }
}

/**
 * Create a new subject
 */
export async function createSubject(data: {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
}) {
  try {
    const subject = await db.subject.create({
      data,
    });
    revalidatePath("/learn");
    return { success: true, subject };
  } catch (error) {
    console.error("Failed to create subject:", error);
    return { success: false, error: "Failed to create subject" };
  }
}

/**
 * Update subject
 */
export async function updateSubject(
  id: string,
  data: {
    name?: string;
    description?: string;
    icon?: string;
    color?: string;
  }
) {
  try {
    const subject = await db.subject.update({
      where: { id },
      data,
    });
    revalidatePath("/learn");
    return { success: true, subject };
  } catch (error) {
    console.error("Failed to update subject:", error);
    return { success: false, error: "Failed to update subject" };
  }
}

// =====================
// MODULE RELATED ACTIONS
// =====================

/**
 * Get module by ID
 */
export async function getModuleById(id: string) {
  try {
    const module = await db.module.findUnique({
      where: { id },
      include: {
        subject: true,
        lessons: {
          orderBy: {
            order: "asc",
          },
          include: {
            prerequisites: true,
          },
        },
      },
    });
    return { success: true, module };
  } catch (error) {
    console.error("Failed to get module:", error);
    return { success: false, error: "Failed to get module" };
  }
}

/**
 * Create a new module
 */
export async function createModule(data: {
  title: string;
  description?: string;
  subjectId: string;
  level?: string;
  order: number;
}) {
  try {
    const module = await db.module.create({
      data,
    });
    revalidatePath("/learn");
    return { success: true, module };
  } catch (error) {
    console.error("Failed to create module:", error);
    return { success: false, error: "Failed to create module" };
  }
}

/**
 * Update module
 */
export async function updateModule(
  id: string,
  data: {
    title?: string;
    description?: string;
    subjectId?: string;
    level?: string;
    order?: number;
  }
) {
  try {
    const module = await db.module.update({
      where: { id },
      data,
    });
    revalidatePath("/learn");
    return { success: true, module };
  } catch (error) {
    console.error("Failed to update module:", error);
    return { success: false, error: "Failed to update module" };
  }
}

// =====================
// LESSON RELATED ACTIONS
// =====================

/**
 * Get lesson by ID
 */
export async function getLessonById(id: string, userId?: string) {
  try {
    const lesson = await db.lesson.findUnique({
      where: { id },
      include: {
        module: {
          include: {
            subject: true,
          },
        },
        prerequisites: true,
        requiredFor: true,
      },
    });

    let progress = null;
    if (userId) {
      progress = await db.lessonProgress.findUnique({
        where: {
          userId_lessonId: {
            userId,
            lessonId: id,
          },
        },
      });
    }

    return { success: true, lesson, progress };
  } catch (error) {
    console.error("Failed to get lesson:", error);
    return { success: false, error: "Failed to get lesson" };
  }
}

/**
 * Create a new lesson
 */
export async function createLesson(data: {
  title: string;
  description?: string;
  content?: string;
  duration: number;
  difficulty: string;
  moduleId: string;
  order: number;
  prerequisiteIds?: string[];
}) {
  try {
    const { prerequisiteIds, ...lessonData } = data;

    const lesson = await db.lesson.create({
      data: {
        ...lessonData,
        prerequisites: prerequisiteIds
          ? {
              connect: prerequisiteIds.map((id) => ({ id })),
            }
          : undefined,
      },
    });

    revalidatePath("/learn");
    return { success: true, lesson };
  } catch (error) {
    console.error("Failed to create lesson:", error);
    return { success: false, error: "Failed to create lesson" };
  }
}

/**
 * Update lesson
 */
export async function updateLesson(
  id: string,
  data: {
    title?: string;
    description?: string;
    content?: string;
    duration?: number;
    difficulty?: string;
    moduleId?: string;
    order?: number;
    prerequisiteIds?: string[];
  }
) {
  try {
    const { prerequisiteIds, ...lessonData } = data;

    let prerequisitesUpdate = {};
    if (prerequisiteIds !== undefined) {
      prerequisitesUpdate = {
        prerequisites: {
          set: [], // Clear existing prerequisites
          connect: prerequisiteIds.map((id) => ({ id })),
        },
      };
    }

    const lesson = await db.lesson.update({
      where: { id },
      data: {
        ...lessonData,
        ...prerequisitesUpdate,
      },
    });

    revalidatePath("/learn");
    return { success: true, lesson };
  } catch (error) {
    console.error("Failed to update lesson:", error);
    return { success: false, error: "Failed to update lesson" };
  }
}

// =====================
// ENROLLMENT RELATED ACTIONS
// =====================

/**
 * Enroll user in a module
 */
export async function enrollUserInModule(data: {
  userId: string;
  moduleId: string;
}) {
  try {
    const { userId, moduleId } = data;

    // Check if enrollment already exists
    const existingEnrollment = await db.enrollment.findUnique({
      where: {
        userId_moduleId: {
          userId,
          moduleId,
        },
      },
    });

    if (existingEnrollment) {
      return {
        success: false,
        error: "User is already enrolled in this module",
        enrollment: existingEnrollment,
      };
    }

    const enrollment = await db.enrollment.create({
      data: {
        userId,
        moduleId,
        status: EnrollmentStatus.IN_PROGRESS,
      },
    });

    // Get all lessons in this module
    const module = await db.module.findUnique({
      where: { id: moduleId },
      include: {
        lessons: {
          orderBy: {
            order: "asc",
          },
          include: {
            prerequisites: true,
          },
        },
      },
    });

    // Create lesson progress entries for all lessons
    if (module?.lessons) {
      for (const lesson of module.lessons) {
        // Check if lesson has prerequisites
        const hasPrerequisites = lesson.prerequisites.length > 0;

        await db.lessonProgress.create({
          data: {
            userId,
            lessonId: lesson.id,
            status: hasPrerequisites
              ? ProgressStatus.LOCKED
              : lesson.order === 1
                ? ProgressStatus.NOT_STARTED
                : ProgressStatus.LOCKED,
          },
        });
      }
    }

    // Create notification for the user
    await db.notification.create({
      data: {
        userId,
        title: "New Enrollment",
        message: `You have successfully enrolled in ${module?.title}`,
        type: NotificationType.SUCCESS,
        link: `/learn`,
      },
    });

    revalidatePath("/learn");
    revalidatePath("/dashboard");
    return { success: true, enrollment };
  } catch (error) {
    console.error("Failed to enroll user:", error);
    return { success: false, error: "Failed to enroll user" };
  }
}

/**
 * Update enrollment status
 */
export async function updateEnrollmentStatus(
  id: string,
  status: EnrollmentStatus
) {
  try {
    const enrollment = await db.enrollment.update({
      where: { id },
      data: {
        status,
        completedAt:
          status === EnrollmentStatus.COMPLETED ? new Date() : undefined,
      },
      include: {
        module: true,
        user: true,
      },
    });

    if (status === EnrollmentStatus.COMPLETED) {
      // Create notification for the user
      await db.notification.create({
        data: {
          userId: enrollment.userId,
          title: "Module Completed",
          message: `Congratulations! You have completed the ${enrollment.module.title} module.`,
          type: NotificationType.SUCCESS,
          link: `/learn`,
        },
      });

      // Check if user should get an achievement
      const userEnrollments = await db.enrollment.count({
        where: {
          userId: enrollment.userId,
          status: EnrollmentStatus.COMPLETED,
        },
      });

      if (userEnrollments === 1) {
        // First module completed achievement
        const achievement = await db.achievement.findFirst({
          where: {
            title: "First Module Completed",
          },
        });

        if (achievement) {
          await db.userAchievement.create({
            data: {
              userId: enrollment.userId,
              achievementId: achievement.id,
            },
          });

          await db.notification.create({
            data: {
              userId: enrollment.userId,
              title: "New Achievement",
              message: `You've earned the "${achievement.title}" achievement!`,
              type: NotificationType.SUCCESS,
              link: `/dashboard`,
            },
          });
        }
      }
    }

    revalidatePath("/learn");
    revalidatePath("/dashboard");
    return { success: true, enrollment };
  } catch (error) {
    console.error("Failed to update enrollment status:", error);
    return { success: false, error: "Failed to update enrollment status" };
  }
}

/**
 * Get user enrollments
 */
export async function getUserEnrollments(userId: string) {
  try {
    const enrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        module: {
          include: {
            subject: true,
            lessons: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
      orderBy: {
        startDate: "desc",
      },
    });

    return { success: true, enrollments };
  } catch (error) {
    console.error("Failed to get user enrollments:", error);
    return { success: false, error: "Failed to get user enrollments" };
  }
}

// =====================
// LESSON PROGRESS RELATED ACTIONS
// =====================

/**
 * Update lesson progress
 */
export async function updateLessonProgress(data: {
  userId: string;
  lessonId: string;
  status: ProgressStatus;
  score?: number;
  timeSpent?: number;
}) {
  try {
    const { userId, lessonId, status, score, timeSpent } = data;

    const progress = await db.lessonProgress.update({
      where: {
        userId_lessonId: {
          userId,
          lessonId,
        },
      },
      data: {
        status,
        score,
        timeSpent: timeSpent ? { increment: timeSpent } : undefined,
        lastAccessed: new Date(),
        completedAt:
          status === ProgressStatus.COMPLETED ? new Date() : undefined,
      },
      include: {
        lesson: {
          include: {
            requiredFor: true,
            module: true,
          },
        },
      },
    });

    if (status === ProgressStatus.COMPLETED) {
      // Unlock next lessons if this is a prerequisite
      for (const nextLesson of progress.lesson.requiredFor) {
        // Check if all prerequisites of the next lesson are completed
        const allPrereqsCompleted = await areAllPrerequisitesCompleted(
          nextLesson.id,
          userId
        );

        if (allPrereqsCompleted) {
          await db.lessonProgress.update({
            where: {
              userId_lessonId: {
                userId,
                lessonId: nextLesson.id,
              },
            },
            data: {
              status: ProgressStatus.NOT_STARTED,
            },
          });
        }
      }

      // Check if all lessons in the module are completed
      const allLessonsCompleted = await areAllLessonsCompleted(
        progress.lesson.moduleId,
        userId
      );

      if (allLessonsCompleted) {
        // Update enrollment status to completed
        const enrollment = await db.enrollment.findFirst({
          where: {
            userId,
            moduleId: progress.lesson.moduleId,
          },
        });

        if (enrollment) {
          await updateEnrollmentStatus(
            enrollment.id,
            EnrollmentStatus.COMPLETED
          );
        }
      }
    }

    revalidatePath("/learn");
    revalidatePath(`/learn/${lessonId}`);
    revalidatePath("/dashboard");
    return { success: true, progress };
  } catch (error) {
    console.error("Failed to update lesson progress:", error);
    return { success: false, error: "Failed to update lesson progress" };
  }
}

/**
 * Get user lesson progress
 */
export async function getUserLessonProgress(userId: string) {
  try {
    const progress = await db.lessonProgress.findMany({
      where: { userId },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastAccessed: "desc",
      },
    });

    return { success: true, progress };
  } catch (error) {
    console.error("Failed to get user lesson progress:", error);
    return { success: false, error: "Failed to get user lesson progress" };
  }
}

/**
 * Helper: Check if all prerequisites of a lesson are completed
 */
async function areAllPrerequisitesCompleted(
  lessonId: string,
  userId: string
): Promise<boolean> {
  const lesson = await db.lesson.findUnique({
    where: { id: lessonId },
    include: {
      prerequisites: {
        select: { id: true },
      },
    },
  });

  if (!lesson || lesson.prerequisites.length === 0) {
    return true;
  }

  const prerequisiteIds = lesson.prerequisites.map((p: any) => p.id);

  const completedPrereqs = await db.lessonProgress.count({
    where: {
      userId,
      lessonId: { in: prerequisiteIds },
      status: ProgressStatus.COMPLETED,
    },
  });

  return completedPrereqs === prerequisiteIds.length;
}

/**
 * Helper: Check if all lessons in a module are completed
 */
async function areAllLessonsCompleted(
  moduleId: string,
  userId: string
): Promise<boolean> {
  const module = await db.module.findUnique({
    where: { id: moduleId },
    include: {
      lessons: {
        select: { id: true },
      },
    },
  });

  if (!module || module.lessons.length === 0) {
    return false;
  }

  const lessonIds = module.lessons.map((l: any) => l.id);

  const completedLessons = await db.lessonProgress.count({
    where: {
      userId,
      lessonId: { in: lessonIds },
      status: ProgressStatus.COMPLETED,
    },
  });

  return completedLessons === lessonIds.length;
}

// =====================
// DIAGNOSTIC RELATED ACTIONS
// =====================

/**
 * Get or create diagnostic subjects
 * This ensures we have subjects available for the diagnostic tests
 */
export async function getOrCreateDiagnosticSubjects() {
  try {
    // Default subjects to ensure exist
    const defaultSubjects = [
      { name: "Mathematics" },
      { name: "Science" },
      { name: "Language Arts" },
      { name: "History" },
    ];

    // Create subjects if they don't exist or get existing ones
    const subjects = await Promise.all(
      defaultSubjects.map(async (subjectData) => {
        // Try to find existing subject
        let subject = await db.subject.findFirst({
          where: { name: subjectData.name },
        });

        // Create if it doesn't exist
        if (!subject) {
          subject = await db.subject.create({
            data: {
              name: subjectData.name,
              description: `${subjectData.name} subject for diagnostic assessments`,
            },
          });
        }

        return subject;
      })
    );

    return { success: true, subjects };
  } catch (error) {
    console.error("Failed to get or create subjects:", error);
    return { success: false, error: "Failed to get or create subjects" };
  }
}

/**
 * Get diagnostic questions by subject
 */
export async function getDiagnosticQuestions(subjectId: string) {
  try {
    const questions = await db.diagnosticQuestion.findMany({
      where: { subjectId },
      orderBy: {
        createdAt: "asc",
      },
    });

    return { success: true, questions };
  } catch (error) {
    console.error("Failed to get diagnostic questions:", error);
    return { success: false, error: "Failed to get diagnostic questions" };
  }
}

/**
 * Generate AI-powered diagnostic questions for a subject
 */
export async function generateDiagnosticQuestions(data: {
  subjectId: string;
  level: string;
  topics?: string[];
  count?: number;
}) {
  try {
    const { subjectId, level, topics, count } = data;

    // Get subject details for context
    const subject = await db.subject.findUnique({
      where: { id: subjectId },
    });

    if (!subject) {
      return { success: false, error: "Subject not found" };
    }

    // Generate questions using AI
    const generatedQuestions = await generateDiagnosticContent({
      mode: "generate_questions",
      subject: subject.name,
      level,
      topics,
      count,
    });

    // Ensure we have an array of questions
    let questionsArray = [];
    if (Array.isArray(generatedQuestions)) {
      questionsArray = generatedQuestions;
    } else if (generatedQuestions && typeof generatedQuestions === "object") {
      // If we got an object with a questions property, use that
      if (Array.isArray(generatedQuestions.questions)) {
        questionsArray = generatedQuestions.questions;
      } else if (
        generatedQuestions.data &&
        Array.isArray(generatedQuestions.data)
      ) {
        questionsArray = generatedQuestions.data;
      } else {
        // Last resort: try to convert object to array if it has numeric keys
        const objKeys = Object.keys(generatedQuestions);
        if (objKeys.length > 0 && objKeys.every((k) => !isNaN(Number(k)))) {
          questionsArray = Object.values(generatedQuestions);
        } else {
          // If we can't extract an array, create a simple fallback question
          questionsArray = [
            {
              questionId: "fallback-question",
              question: `What is the primary focus of ${subject.name}?`,
              options: ["Option A", "Option B", "Option C", "Option D"],
              correctAnswer: 0,
              difficulty: "medium",
            },
          ];
        }
      }
    }

    if (questionsArray.length === 0) {
      throw new Error("No questions were generated");
    }

    // Store questions in the database
    const savedQuestions = await Promise.all(
      questionsArray.map(async (q: any) => {
        // Ensure we have the right property names
        // (some AI models use different formats)
        const questionText = q.question || q.text || q.questionText || "";
        const questionOptions = q.options || q.choices || [];
        let correctAnswer = q.correctAnswer || q.correct || q.answer || 0;
        const difficulty = q.difficulty?.toLowerCase() || "medium";

        // Format options properly for storage
        let options = questionOptions;

        // If no options array provided, try to extract from question text
        if (!options || options.length === 0) {
          if (questionText.includes("A)") || questionText.includes("A.")) {
            options = questionText
              .split(/[A-D][\.|\)]/)
              .slice(1)
              .map((opt: string) => opt.trim())
              .filter((opt: string) => opt.length > 0);
          }

          // If still no options, check if there's an options string that needs parsing
          else if (typeof q.options === "string") {
            // Try to parse option string like "1. Option A, 2. Option B" etc.
            const optionsString = q.options as string;
            options = optionsString
              .split(/\d+\.\s*/)
              .slice(1) // Remove the first empty element
              .map((o) => o.trim())
              .filter((o) => o.length > 0);
          }

          // Last resort fallback
          if (!options || options.length === 0) {
            options = [
              `Option for ${subject.name} 1`,
              `Option for ${subject.name} 2`,
              `Option for ${subject.name} 3`,
              `Option for ${subject.name} 4`,
            ];
          }
        }

        // Normalize the correct answer to a number index
        if (typeof correctAnswer === "string") {
          if (correctAnswer.match(/^[A-D]$/i)) {
            // Convert A,B,C,D to 0,1,2,3
            correctAnswer = correctAnswer.toUpperCase().charCodeAt(0) - 65;
          } else if (!isNaN(parseInt(correctAnswer))) {
            // Convert string number to integer
            correctAnswer = parseInt(correctAnswer);
          } else {
            // Default to first option
            correctAnswer = 0;
          }
        }

        return db.diagnosticQuestion.create({
          data: {
            subjectId,
            text: questionText,
            options,
            correctAnswer: correctAnswer,
            difficulty: difficulty,
          },
        });
      })
    );

    return { success: true, questions: savedQuestions };
  } catch (error) {
    console.error("Failed to generate diagnostic questions:", error);
    return { success: false, error: "Failed to generate diagnostic questions" };
  }
}

/**
 * Create diagnostic result with responses
 */
export async function submitDiagnosticResult(data: {
  userId: string;
  score: number;
  responses: {
    questionId: string;
    answer: number;
    isCorrect: boolean;
  }[];
  recommendations?: string;
}) {
  try {
    const { userId, score, responses, recommendations } = data;

    const result = await db.diagnosticResult.create({
      data: {
        userId,
        score,
        recommendations,
        responses: {
          create: responses.map((resp) => ({
            questionId: resp.questionId,
            answer: resp.answer,
            isCorrect: resp.isCorrect,
          })),
        },
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId,
        title: "Diagnostic Completed",
        message: `You scored ${Math.round(score * 100)}% on your diagnostic assessment.`,
        type: NotificationType.INFO,
        link: `/diagnostic`,
      },
    });

    revalidatePath("/diagnostic");
    revalidatePath("/dashboard");
    return { success: true, result };
  } catch (error) {
    console.error("Failed to submit diagnostic result:", error);
    return { success: false, error: "Failed to submit diagnostic result" };
  }
}

/**
 * Generate AI-powered recommendations based on diagnostic results
 */
export async function generateDiagnosticRecommendations(resultId: string) {
  try {
    const result = await db.diagnosticResult.findUnique({
      where: { id: resultId },
      include: {
        user: true,
        responses: {
          include: {
            question: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return { success: false, error: "Diagnostic result not found" };
    }

    // Prepare user answers for evaluation
    const userAnswers = result.responses.map((response: any) => ({
      questionId: response.questionId,
      question: response.question.text,
      answer:
        response.answer !== null
          ? // If we stored options as A, B, C, D, convert back for the AI
            String.fromCharCode(65 + response.answer)
          : "No answer provided",
      isCorrect: response.isCorrect,
    }));

    // Get subject from the first question (assuming all questions are from the same subject)
    const subject =
      result.responses[0]?.question?.subject?.name || "General Knowledge";

    // Generate evaluation and recommendations
    const evaluation = await generateDiagnosticContent({
      mode: "evaluate_answers",
      subject,
      level: "all", // Adjust based on your needs
      userAnswers,
    });

    // Update the result with recommendations
    const updatedResult = await db.diagnosticResult.update({
      where: { id: resultId },
      data: {
        recommendations: JSON.stringify(evaluation),
      },
    });

    // Notify the user
    await db.notification.create({
      data: {
        userId: result.userId,
        title: "Learning Recommendations Ready",
        message:
          "We've analyzed your diagnostic results and created personalized learning recommendations.",
        type: NotificationType.SUCCESS,
        link: `/learn`,
      },
    });

    revalidatePath("/diagnostic");
    revalidatePath("/learn");
    revalidatePath("/dashboard");

    return {
      success: true,
      recommendations: evaluation,
      result: updatedResult,
    };
  } catch (error) {
    console.error("Failed to generate diagnostic recommendations:", error);
    return {
      success: false,
      error: "Failed to generate diagnostic recommendations",
    };
  }
}

/**
 * Get user's diagnostic results
 */
export async function getUserDiagnosticResults(userId: string) {
  try {
    const results = await db.diagnosticResult.findMany({
      where: { userId },
      include: {
        responses: {
          include: {
            question: true,
          },
        },
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    return { success: true, results };
  } catch (error) {
    console.error("Failed to get diagnostic results:", error);
    return { success: false, error: "Failed to get diagnostic results" };
  }
}

// =====================
// PROJECT RELATED ACTIONS
// =====================

/**
 * Create a new project
 */
export async function createProject(data: {
  userId: string;
  title: string;
  description?: string;
  dueDate?: Date;
  steps?: {
    title: string;
    description?: string;
    order: number;
    dueDate?: Date;
  }[];
}) {
  try {
    const { userId, title, description, dueDate, steps } = data;

    const project = await db.project.create({
      data: {
        userId,
        title,
        description,
        dueDate,
        status: ProjectStatus.NOT_STARTED,
        steps: steps
          ? {
              create: steps.map((step, index) => ({
                ...step,
                order: step.order || index + 1,
                status: ProjectStepStatus.PENDING,
              })),
            }
          : undefined,
      },
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId,
        title: "New Project",
        message: `You have a new project: ${title}`,
        type: NotificationType.INFO,
        link: `/projects`,
      },
    });

    revalidatePath("/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to create project:", error);
    return { success: false, error: "Failed to create project" };
  }
}

/**
 * Get user's projects
 */
export async function getUserProjects(userId: string) {
  try {
    const projects = await db.project.findMany({
      where: { userId },
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, projects };
  } catch (error) {
    console.error("Failed to get user projects:", error);
    return { success: false, error: "Failed to get user projects" };
  }
}

/**
 * Get project by ID
 */
export async function getProjectById(id: string) {
  try {
    const project = await db.project.findUnique({
      where: { id },
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return { success: true, project };
  } catch (error) {
    console.error("Failed to get project:", error);
    return { success: false, error: "Failed to get project" };
  }
}

/**
 * Update project
 */
export async function updateProject(
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: ProjectStatus;
    progress?: number;
    dueDate?: Date;
    submittedAt?: Date;
    grade?: number;
    feedback?: string;
  }
) {
  try {
    const project = await db.project.update({
      where: { id },
      data,
      include: {
        steps: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    revalidatePath("/projects");
    return { success: true, project };
  } catch (error) {
    console.error("Failed to update project:", error);
    return { success: false, error: "Failed to update project" };
  }
}

/**
 * Update project step status
 */
export async function updateProjectStep(
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: ProjectStepStatus;
    dueDate?: Date;
    completedAt?: Date;
  }
) {
  try {
    const step = await db.projectStep.update({
      where: { id },
      data,
      include: {
        project: true,
      },
    });

    // If step is completed, update project progress
    if (data.status === ProjectStepStatus.COMPLETED) {
      const allSteps = await db.projectStep.findMany({
        where: { projectId: step.projectId },
      });

      const completedSteps = await db.projectStep.count({
        where: {
          projectId: step.projectId,
          status: ProjectStepStatus.COMPLETED,
        },
      });

      const progress =
        allSteps.length > 0 ? (completedSteps / allSteps.length) * 100 : 0;

      await db.project.update({
        where: { id: step.projectId },
        data: {
          progress,
          status:
            progress === 100
              ? ProjectStatus.SUBMITTED
              : ProjectStatus.IN_PROGRESS,
        },
      });
    }

    revalidatePath("/projects");
    return { success: true, step };
  } catch (error) {
    console.error("Failed to update project step:", error);
    return { success: false, error: "Failed to update project step" };
  }
}

// =====================
// CAREER RELATED ACTIONS
// =====================

/**
 * Get all careers
 */
export async function getAllCareers() {
  try {
    const careers = await db.career.findMany({
      include: {
        jobOpenings: true,
        careerPath: {
          orderBy: {
            level: "asc",
          },
        },
        certifications: true,
      },
    });

    return { success: true, careers };
  } catch (error) {
    console.error("Failed to get careers:", error);
    return { success: false, error: "Failed to get careers" };
  }
}

/**
 * Get career by ID
 */
export async function getCareerById(id: string) {
  try {
    const career = await db.career.findUnique({
      where: { id },
      include: {
        jobOpenings: true,
        careerPath: {
          orderBy: {
            level: "asc",
          },
        },
        certifications: true,
      },
    });

    return { success: true, career };
  } catch (error) {
    console.error("Failed to get career:", error);
    return { success: false, error: "Failed to get career" };
  }
}

/**
 * Create a new career
 */
export async function createCareer(data: {
  title: string;
  description?: string;
  requirements?: string;
  salaryRange?: string;
}) {
  try {
    const career = await db.career.create({
      data,
    });

    revalidatePath("/career");
    return { success: true, career };
  } catch (error) {
    console.error("Failed to create career:", error);
    return { success: false, error: "Failed to create career" };
  }
}

/**
 * Add job opening to career
 */
export async function addJobOpening(data: {
  careerId: string;
  title: string;
  company: string;
  location: string;
  salary?: string;
}) {
  try {
    const jobOpening = await db.jobOpening.create({
      data,
    });

    revalidatePath("/career");
    return { success: true, jobOpening };
  } catch (error) {
    console.error("Failed to add job opening:", error);
    return { success: false, error: "Failed to add job opening" };
  }
}

/**
 * Add career path step
 */
export async function addCareerPathStep(data: {
  careerId: string;
  title: string;
  description?: string;
  level: number;
  salaryRange?: string;
}) {
  try {
    const step = await db.careerPathStep.create({
      data,
    });

    revalidatePath("/career");
    return { success: true, step };
  } catch (error) {
    console.error("Failed to add career path step:", error);
    return { success: false, error: "Failed to add career path step" };
  }
}

/**
 * Add certification to career
 */
export async function addCertification(data: {
  careerId: string;
  name: string;
  provider: string;
}) {
  try {
    const certification = await db.certification.create({
      data,
    });

    revalidatePath("/career");
    return { success: true, certification };
  } catch (error) {
    console.error("Failed to add certification:", error);
    return { success: false, error: "Failed to add certification" };
  }
}

// =====================
// TUTOR RELATED ACTIONS
// =====================

/**
 * Create a new tutor session
 */
export async function createTutorSession(data: {
  userId: string;
  title?: string;
  scheduledAt?: Date;
}) {
  try {
    const session = await db.tutorSession.create({
      data: {
        ...data,
        status: TutorSessionStatus.SCHEDULED,
        messages: {
          create: [
            {
              sender: MessageSender.SYSTEM,
              content:
                "Welcome to your tutoring session! I'm here to help you with any questions you have.",
            },
          ],
        },
      },
      include: {
        messages: {
          orderBy: {
            sentAt: "asc",
          },
        },
      },
    });

    revalidatePath("/tutor");
    return { success: true, session };
  } catch (error) {
    console.error("Failed to create tutor session:", error);
    return { success: false, error: "Failed to create tutor session" };
  }
}

/**
 * Get user's tutor sessions
 */
export async function getUserTutorSessions(userId: string) {
  try {
    const sessions = await db.tutorSession.findMany({
      where: { userId },
      include: {
        messages: {
          orderBy: {
            sentAt: "asc",
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    return { success: true, sessions };
  } catch (error) {
    console.error("Failed to get tutor sessions:", error);
    return { success: false, error: "Failed to get tutor sessions" };
  }
}

/**
 * Get tutor session by ID
 */
export async function getTutorSessionById(id: string) {
  try {
    const session = await db.tutorSession.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: {
            sentAt: "asc",
          },
        },
      },
    });

    return { success: true, session };
  } catch (error) {
    console.error("Failed to get tutor session:", error);
    return { success: false, error: "Failed to get tutor session" };
  }
}

/**
 * Update tutor session status
 */
export async function updateTutorSessionStatus(
  id: string,
  status: TutorSessionStatus
) {
  try {
    const session = await db.tutorSession.update({
      where: { id },
      data: {
        status,
        endedAt:
          status === TutorSessionStatus.COMPLETED ? new Date() : undefined,
      },
    });

    revalidatePath("/tutor");
    return { success: true, session };
  } catch (error) {
    console.error("Failed to update tutor session status:", error);
    return { success: false, error: "Failed to update tutor session status" };
  }
}

/**
 * Add message to tutor session
 */
export async function addTutorMessage(data: {
  sessionId: string;
  sender: MessageSender;
  content: string;
}) {
  try {
    const message = await db.tutorMessage.create({
      data,
    });

    // Update session status to in progress if it's the first user message
    if (data.sender === MessageSender.USER) {
      await db.tutorSession.update({
        where: { id: data.sessionId },
        data: {
          status: TutorSessionStatus.IN_PROGRESS,
          updatedAt: new Date(),
        },
      });
    }

    revalidatePath("/tutor");
    return { success: true, message };
  } catch (error) {
    console.error("Failed to add tutor message:", error);
    return { success: false, error: "Failed to add tutor message" };
  }
}

// =====================
// NOTIFICATION RELATED ACTIONS
// =====================

/**
 * Get user's notifications
 */
export async function getUserNotifications(userId: string) {
  try {
    const notifications = await db.notification.findMany({
      where: { userId },
      orderBy: {
        createdAt: "desc",
      },
    });

    return { success: true, notifications };
  } catch (error) {
    console.error("Failed to get notifications:", error);
    return { success: false, error: "Failed to get notifications" };
  }
}

/**
 * Mark notification as read
 */
export async function markNotificationAsRead(id: string) {
  try {
    const notification = await db.notification.update({
      where: { id },
      data: {
        isRead: true,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, notification };
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    return { success: false, error: "Failed to mark notification as read" };
  }
}

/**
 * Create a new notification
 */
export async function createNotification(data: {
  userId: string;
  title: string;
  message: string;
  type: NotificationType;
  link?: string;
}) {
  try {
    const notification = await db.notification.create({
      data,
    });

    revalidatePath("/dashboard");
    return { success: true, notification };
  } catch (error) {
    console.error("Failed to create notification:", error);
    return { success: false, error: "Failed to create notification" };
  }
}

// =====================
// ACHIEVEMENT RELATED ACTIONS
// =====================

/**
 * Get all achievements
 */
export async function getAllAchievements() {
  try {
    const achievements = await db.achievement.findMany({
      orderBy: {
        points: "desc",
      },
    });

    return { success: true, achievements };
  } catch (error) {
    console.error("Failed to get achievements:", error);
    return { success: false, error: "Failed to get achievements" };
  }
}

/**
 * Get user's achievements
 */
export async function getUserAchievements(userId: string) {
  try {
    const userAchievements = await db.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: {
        awardedAt: "desc",
      },
    });

    return { success: true, userAchievements };
  } catch (error) {
    console.error("Failed to get user achievements:", error);
    return { success: false, error: "Failed to get user achievements" };
  }
}

/**
 * Create a new achievement
 */
export async function createAchievement(data: {
  title: string;
  description?: string;
  icon?: string;
  criteria?: string;
  points: number;
}) {
  try {
    const achievement = await db.achievement.create({
      data,
    });

    return { success: true, achievement };
  } catch (error) {
    console.error("Failed to create achievement:", error);
    return { success: false, error: "Failed to create achievement" };
  }
}

/**
 * Award achievement to user
 */
export async function awardAchievement(data: {
  userId: string;
  achievementId: string;
}) {
  try {
    const { userId, achievementId } = data;

    // Check if already awarded
    const existing = await db.userAchievement.findUnique({
      where: {
        userId_achievementId: {
          userId,
          achievementId,
        },
      },
    });

    if (existing) {
      return {
        success: false,
        error: "User already has this achievement",
        userAchievement: existing,
      };
    }

    const achievement = await db.achievement.findUnique({
      where: { id: achievementId },
    });

    const userAchievement = await db.userAchievement.create({
      data: {
        userId,
        achievementId,
      },
      include: {
        achievement: true,
      },
    });

    // Create notification
    await db.notification.create({
      data: {
        userId,
        title: "New Achievement",
        message: `You've earned the "${achievement?.title}" achievement!`,
        type: NotificationType.SUCCESS,
        link: `/dashboard`,
      },
    });

    revalidatePath("/dashboard");
    return { success: true, userAchievement };
  } catch (error) {
    console.error("Failed to award achievement:", error);
    return { success: false, error: "Failed to award achievement" };
  }
}

// =====================
// DASHBOARD RELATED ACTIONS
// =====================

/**
 * Get user dashboard data
 */
export async function getUserDashboard(userId: string) {
  try {
    // Get recent lessons
    const recentLessons = await db.lessonProgress.findMany({
      where: {
        userId,
        status: {
          in: [ProgressStatus.IN_PROGRESS, ProgressStatus.COMPLETED],
        },
      },
      include: {
        lesson: {
          include: {
            module: {
              include: {
                subject: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastAccessed: "desc",
      },
      take: 5,
    });

    // Get active enrollments
    const activeEnrollments = await db.enrollment.findMany({
      where: {
        userId,
        status: EnrollmentStatus.IN_PROGRESS,
      },
      include: {
        module: {
          include: {
            subject: true,
            lessons: true,
          },
        },
      },
      take: 3,
    });

    // Get current projects
    const currentProjects = await db.project.findMany({
      where: {
        userId,
        status: {
          in: [ProjectStatus.IN_PROGRESS, ProjectStatus.NOT_STARTED],
        },
      },
      orderBy: {
        dueDate: "asc",
      },
      take: 3,
    });

    // Get unread notifications
    const unreadNotifications = await db.notification.findMany({
      where: {
        userId,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Get latest diagnostic result
    const latestDiagnostic = await db.diagnosticResult.findFirst({
      where: { userId },
      orderBy: {
        completedAt: "desc",
      },
    });

    // Get achievements
    const achievements = await db.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
      orderBy: {
        awardedAt: "desc",
      },
      take: 5,
    });

    return {
      success: true,
      dashboard: {
        recentLessons,
        activeEnrollments,
        currentProjects,
        unreadNotifications,
        latestDiagnostic,
        achievements,
      },
    };
  } catch (error) {
    console.error("Failed to get dashboard data:", error);
    return { success: false, error: "Failed to get dashboard data" };
  }
}
