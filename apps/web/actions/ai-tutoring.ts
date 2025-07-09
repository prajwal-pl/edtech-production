"use server";

import db from "@/lib/prisma";
import {
  TutorSessionStatus,
  MessageSender,
  ProgressStatus,
  ProjectStatus,
  Enrollment,
  LessonProgress,
  DiagnosticResult,
  TutorMessage,
  Module,
  ProjectStep,
  Career,
  NotificationType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";
import { generateText } from "./ai";

/**
 * Start a new AI tutor session
 */
export async function startAITutorSession(data: {
  userId: string;
  title?: string;
  initialQuestion?: string;
}) {
  try {
    const { userId, title, initialQuestion } = data;

    // Create a new tutor session
    const session = await db.tutorSession.create({
      data: {
        userId,
        title: title || "AI Tutoring Session",
        status: TutorSessionStatus.IN_PROGRESS,
        messages: {
          create: [
            {
              sender: MessageSender.SYSTEM,
              content:
                "Welcome to your tutoring session! I'm your AI tutor, ready to help you with any questions you have about your coursework.",
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

    // If there's an initial question, process it
    if (initialQuestion) {
      await sendMessageToAITutor({
        sessionId: session.id,
        userId,
        message: initialQuestion,
      });
    }

    revalidatePath("/tutor");
    return { success: true, session };
  } catch (error) {
    console.error("Failed to create AI tutor session:", error);
    return { success: false, error: "Failed to create AI tutor session" };
  }
}

/**
 * Send message to AI tutor and get response
 */
export async function sendMessageToAITutor(data: {
  sessionId: string;
  userId: string;
  message: string;
}) {
  try {
    const { sessionId, userId, message } = data;

    // Add user message to the session
    await db.tutorMessage.create({
      data: {
        sessionId,
        sender: MessageSender.USER,
        content: message,
      },
    });

    // Get all messages in the conversation for context
    const sessionMessages = await db.tutorMessage.findMany({
      where: { sessionId },
      orderBy: { sentAt: "asc" },
    });

    // Get user's learning progress for context
    const userEnrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        module: {
          include: {
            subject: true,
          },
        },
      },
    });

    const userProgress = await db.lessonProgress.findMany({
      where: {
        userId,
        status: { in: ["IN_PROGRESS", "COMPLETED"] as ProgressStatus[] },
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
    });

    // Create context for the AI
    const contextInfo = {
      enrollments: userEnrollments.map(
        (
          e: Enrollment & {
            module: Module & {
              subject: {
                name: string;
              };
            };
          }
        ) => ({
          subject: e.module.subject.name,
          module: e.module.title,
          status: e.status,
        })
      ),
      recentLessons: userProgress.slice(0, 5).map(
        (
          p: LessonProgress & {
            lesson: {
              title: string;
              module: {
                subject: {
                  name: string;
                };
                title: string;
              };
            };
          }
        ) => ({
          title: p.lesson.title,
          subject: p.lesson.module.subject.name,
          module: p.lesson.module.title,
          status: p.status,
        })
      ),
    };

    // Format conversation history for the AI
    const conversationHistory = sessionMessages.map((msg: TutorMessage) => ({
      role:
        msg.sender === MessageSender.USER
          ? "user"
          : msg.sender === MessageSender.AI
            ? "assistant"
            : "system",
      content: msg.content,
    }));

    // Generate AI response
    const prompt = `
As an AI tutor, please respond to this student's question. Here's some context about their learning progress:
${JSON.stringify(contextInfo, null, 2)}

The conversation so far:
${conversationHistory.map((msg: { role: string; content: string }) => `${msg.role}: ${msg.content}`).join("\n")}

The student's question is: ${message}

Please provide a helpful, educational response that helps them understand the concept. Include examples where appropriate.
`;

    const aiResponse = await generateText(prompt);

    // Save AI response to the session
    await db.tutorMessage.create({
      data: {
        sessionId,
        sender: MessageSender.AI,
        content: aiResponse,
      },
    });

    // Update session
    await db.tutorSession.update({
      where: { id: sessionId },
      data: {
        updatedAt: new Date(),
      },
    });

    revalidatePath("/tutor");
    return { success: true, response: aiResponse };
  } catch (error) {
    console.error("Failed to process AI tutor message:", error);
    return { success: false, error: "Failed to process AI tutor message" };
  }
}

/**
 * End an AI tutor session
 */
export async function endAITutorSession(sessionId: string) {
  try {
    // Update session status
    const session = await db.tutorSession.update({
      where: { id: sessionId },
      data: {
        status: TutorSessionStatus.COMPLETED,
        endedAt: new Date(),
      },
    });

    // Add a closing message
    await db.tutorMessage.create({
      data: {
        sessionId,
        sender: MessageSender.SYSTEM,
        content:
          "This tutoring session has ended. You can start a new session anytime you need help with your learning.",
      },
    });

    revalidatePath("/tutor");
    return { success: true, session };
  } catch (error) {
    console.error("Failed to end AI tutor session:", error);
    return { success: false, error: "Failed to end AI tutor session" };
  }
}

/**
 * Generate study recommendations based on user's progress and interests
 */
export async function generateStudyRecommendations(userId: string) {
  try {
    // Get user's learning progress
    const userEnrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        module: {
          include: {
            subject: true,
          },
        },
      },
    });

    const userProgress = await db.lessonProgress.findMany({
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
    });

    // Get diagnostic results
    const diagnosticResults = await db.diagnosticResult.findMany({
      where: { userId },
      orderBy: { completedAt: "desc" },
      take: 1,
    });

    // Format user data for AI prompt
    const userData = {
      enrollments: userEnrollments.map(
        (
          e: Enrollment & {
            module: Module & {
              subject: {
                name: string;
              };
            };
          }
        ) => ({
          subject: e.module.subject.name,
          module: e.module.title,
          status: e.status,
        })
      ),
      progress: userProgress.map(
        (
          p: LessonProgress & {
            lesson: {
              title: string;
              module: {
                subject: {
                  name: string;
                };
                title: string;
              };
            };
          }
        ) => ({
          lesson: p.lesson.title,
          module: p.lesson.module.title,
          subject: p.lesson.module.subject.name,
          status: p.status,
          score: p.score,
        })
      ),
      diagnosticResults: diagnosticResults.map((r: DiagnosticResult) => ({
        score: r.score,
        recommendations: r.recommendations,
      })),
    };

    // Get all available modules for recommendations
    const allModules = await db.module.findMany({
      include: {
        subject: true,
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    });

    // Format available modules for AI prompt
    const availableModules = allModules.map(
      (
        m: Module & {
          subject: { name: string };
          lessons: Array<{
            title: string;
            description: string | null;
            duration: number;
            difficulty: string;
          }>;
        }
      ) => ({
        id: m.id,
        title: m.title,
        subject: m.subject.name,
        description: m.description,
        level: m.level,
        lessonCount: m.lessons.length,
      })
    );

    // Generate recommendations with AI
    const prompt = `
Based on this user's learning progress, enrollments, and diagnostic results, please provide personalized study recommendations.

User data:
${JSON.stringify(userData, null, 2)}

Available modules they could study:
${JSON.stringify(availableModules, null, 2)}

Please provide:
1. 3-5 recommended modules they should enroll in next, with a brief explanation why
2. Any specific lessons they should revisit based on their progress
3. Study tips tailored to their learning patterns
4. Suggestions for projects they might want to work on

Format the response in markdown for readability.
`;

    const recommendations = await generateText(prompt);

    return { success: true, recommendations };
  } catch (error) {
    console.error("Failed to generate study recommendations:", error);
    return {
      success: false,
      error: "Failed to generate study recommendations",
    };
  }
}

/**
 * Generate feedback on a submitted project
 */
export async function generateProjectFeedback(projectId: string) {
  try {
    // Get project details
    const project = await db.project.findUnique({
      where: { id: projectId },
      include: {
        steps: {
          orderBy: { order: "asc" },
        },
        user: true,
      },
    });

    if (!project) {
      return { success: false, error: "Project not found" };
    }

    // Generate feedback with AI
    const prompt = `
As a project evaluator, please provide constructive feedback for this student project:

Project Title: ${project.title}
Description: ${project.description || "No description provided"}
Current Progress: ${project.progress || 0}%
Submission Status: ${project.status}

Project Steps:
${project.steps.map((step: ProjectStep) => `- ${step.title}: ${step.status} ${step.completedAt ? `(Completed on ${step.completedAt.toLocaleDateString()})` : ""}`).join("\n")}

Please provide:
1. Overall assessment of the project (strengths and areas for improvement)
2. Specific feedback on each completed step
3. Suggestions for how to improve any incomplete steps
4. A fair grade for the project (percentage)
5. Next steps or follow-up projects the student might consider

Format the response in markdown for readability.
`;

    const feedback = await generateText(prompt);

    // Extract a grade from the feedback (simplified logic - in production you might want more robust parsing)
    let grade = 0;
    const gradeMatch = feedback.match(/grade.*?(\d+)%/i);
    if (gradeMatch && gradeMatch[1]) {
      grade = Math.min(100, Math.max(0, parseInt(gradeMatch[1])));
    }

    // Update the project with the feedback and grade
    const updatedProject = await db.project.update({
      where: { id: projectId },
      data: {
        feedback,
        grade,
        status: ProjectStatus.COMPLETED,
      },
    });

    // Create notification for the user
    await db.notification.create({
      data: {
        userId: project.userId,
        title: "Project Feedback",
        message: `Your project "${project.title}" has been graded. You received a ${grade}%.`,
        type: NotificationType.SUCCESS,
        link: `/projects`,
      },
    });

    revalidatePath("/projects");
    return { success: true, feedback, grade, project: updatedProject };
  } catch (error) {
    console.error("Failed to generate project feedback:", error);
    return { success: false, error: "Failed to generate project feedback" };
  }
}

/**
 * Generate personalized learning path based on career goals
 */
export async function generateLearningPath(data: {
  userId: string;
  careerGoal: string;
  timeframe?: string;
  currentSkills?: string[];
}) {
  try {
    const { userId, careerGoal, timeframe, currentSkills } = data;

    // Get all available careers
    const careers = await db.career.findMany({
      include: {
        careerPath: true,
        certifications: true,
      },
    });

    // Get all available modules
    const modules = await db.module.findMany({
      include: {
        subject: true,
        lessons: {
          orderBy: { order: "asc" },
        },
      },
    });

    // Get user's current progress
    const userEnrollments = await db.enrollment.findMany({
      where: { userId },
      include: {
        module: {
          include: {
            subject: true,
          },
        },
      },
    });

    // Format data for AI
    const userData = {
      careerGoal,
      timeframe: timeframe || "1 year",
      currentSkills: currentSkills || [],
      currentEnrollments: userEnrollments.map(
        (
          e: Enrollment & {
            module: Module & {
              subject: {
                name: string;
              };
            };
          }
        ) => ({
          subject: e.module.subject.name,
          module: e.module.title,
          status: e.status,
        })
      ),
    };

    const availableData = {
      careers: careers.map(
        (
          c: Career & {
            careerPath: Array<{
              title: string;
              level: number;
              description: string | null;
            }>;
            certifications: Array<{
              name: string;
              provider: string;
            }>;
          }
        ) => ({
          title: c.title,
          description: c.description,
          requirements: c.requirements,
          salaryRange: c.salaryRange,
          path: c.careerPath.map((p) => ({
            title: p.title,
            level: p.level,
            description: p.description,
          })),
          certifications: c.certifications.map((cert) => ({
            name: cert.name,
            provider: cert.provider,
          })),
        })
      ),
      modules: modules.map(
        (
          m: Module & {
            subject: { name: string };
            lessons: Array<{
              title: string;
              description: string | null;
              duration: number;
              difficulty: string;
            }>;
          }
        ) => ({
          id: m.id,
          title: m.title,
          subject: m.subject.name,
          description: m.description,
          level: m.level,
          lessonCount: m.lessons.length,
          lessons: m.lessons.map((l) => ({
            title: l.title,
            description: l.description,
            duration: l.duration,
            difficulty: l.difficulty,
          })),
        })
      ),
    };

    // Generate learning path with AI
    const prompt = `
Create a personalized learning path for a student with these career goals and current progress:

Student Information:
${JSON.stringify(userData, null, 2)}

Available resources:
${JSON.stringify(availableData, null, 2)}

Please create a comprehensive learning path that will help this student achieve their career goal. Include:

1. A step-by-step roadmap with timeline (based on their timeframe of ${timeframe || "1 year"})
2. Specific modules they should take, in what order, and why
3. Projects they should complete to build their portfolio
4. Certifications they should consider pursuing
5. Skills they need to develop and how they can measure progress
6. Career milestones they should aim for

Format the response in markdown for readability with clear sections and bullet points.
`;

    const learningPath = await generateText(prompt);

    return { success: true, learningPath };
  } catch (error) {
    console.error("Failed to generate learning path:", error);
    return { success: false, error: "Failed to generate learning path" };
  }
}
