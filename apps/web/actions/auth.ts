"use server";

import db from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { EducationLevel } from "@/prisma/generated/client";

/**
 * User CRUD functions - Clerk handles authentication
 * These functions manage user data in our database
 */

/**
 * Create or update a user in our database when a user authenticates with Clerk
 */
export async function syncUserWithClerk(data: {
  clerkId: string;
  email: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  avatar?: string;
}) {
  try {
    const { clerkId, email, firstName, lastName, displayName, avatar } = data;

    // Check if user already exists
    const existingUser = await db.user.findFirst({
      where: {
        OR: [{ email }, { clerkId }],
      },
    });

    if (existingUser) {
      // Update existing user
      const user = await db.user.update({
        where: { id: existingUser.id },
        data: {
          email,
          clerkId, // Make sure the clerkId is updated/set
          firstName,
          lastName,
          displayName:
            displayName || `${firstName || ""} ${lastName || ""}`.trim(),
          avatar,
        },
      });

      return { success: true, user, isNewUser: false };
    }

    // Create new user
    const user = await db.user.create({
      data: {
        email,
        clerkId,
        firstName,
        lastName,
        displayName:
          displayName || `${firstName || ""} ${lastName || ""}`.trim(),
        avatar,
      },
    });

    return { success: true, user, isNewUser: true };
  } catch (error) {
    console.error("User sync error:", error);
    return { success: false, error: "Failed to sync user with Clerk" };
  }
}

/**
 * Get user by email
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findUnique({
      where: { email },
      include: {
        team: true,
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Get user error:", error);
    return { success: false, error: "Failed to get user" };
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
        enrollments: true,
        progress: true,
        diagnosticResults: true,
        projects: true,
        tutorSessions: true,
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    console.error("Get user error:", error);
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

    revalidatePath("/dashboard");
    revalidatePath("/settings");

    return { success: true, user };
  } catch (error) {
    console.error("Update user error:", error);
    return { success: false, error: "Failed to update user" };
  }
}

/**
 * Delete user account
 */
export async function deleteUserAccount(id: string) {
  try {
    // Note: In a real application, you might want to archive user data instead
    // of completely deleting it, or handle cascading deletes carefully

    // Delete user data
    await db.user.delete({
      where: { id },
    });

    return { success: true };
  } catch (error) {
    console.error("Delete user error:", error);
    return { success: false, error: "Failed to delete user account" };
  }
}

/**
 * Get user dashboard data
 */
export async function getUserDashboardData(id: string) {
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
          orderBy: {
            updatedAt: "desc",
          },
          take: 5,
        },
        progress: {
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
        },
        diagnosticResults: {
          orderBy: {
            completedAt: "desc",
          },
          take: 1,
        },
        projects: {
          orderBy: {
            updatedAt: "desc",
          },
          take: 3,
        },
        achievements: {
          include: {
            achievement: true,
          },
          orderBy: {
            awardedAt: "desc",
          },
          take: 5,
        },
      },
    });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    // Get unread notifications
    const unreadNotifications = await db.notification.findMany({
      where: {
        userId: id,
        isRead: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });

    // Get recent tutor sessions
    const recentTutorSessions = await db.tutorSession.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 3,
    });

    return {
      success: true,
      dashboardData: {
        user,
        enrollments: user.enrollments,
        recentProgress: user.progress,
        latestDiagnostic: user.diagnosticResults[0] || null,
        projects: user.projects,
        achievements: user.achievements,
        unreadNotifications,
        recentTutorSessions,
      },
    };
  } catch (error) {
    console.error("Get dashboard data error:", error);
    return { success: false, error: "Failed to get user dashboard data" };
  }
}
