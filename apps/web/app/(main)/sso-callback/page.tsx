"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { syncUserWithClerk } from "@/actions/auth";
import { useRouter } from "next/navigation";

export default function SSOCallbackPage() {
  const { isLoaded, isSignedIn, user } = useUser();
  const router = useRouter();

  // After OAuth callback is processed, sync user with our database
  useEffect(() => {
    // Only run this effect when user data is loaded and user is signed in
    if (isLoaded && isSignedIn && user) {
      const syncUser = async () => {
        try {
          // Get user details from Clerk
          const userData = {
            clerkId: user.id,
            email: user.primaryEmailAddress?.emailAddress || "",
            firstName: user.firstName || undefined,
            lastName: user.lastName || undefined,
            displayName: user.fullName || undefined,
            avatar: user.imageUrl || undefined,
          };

          // Sync user with our database
          const result = await syncUserWithClerk(userData);

          if (result.success) {
            console.log(
              "OAuth user synced with database:",
              result.isNewUser ? "New user created" : "Existing user updated"
            );
          } else {
            console.error(
              "Failed to sync OAuth user with database:",
              result.error
            );
          }

          // Continue to dashboard regardless of sync result
          router.push("/dashboard");
        } catch (error) {
          console.error("Error syncing OAuth user with database:", error);
          // Continue to dashboard even if sync fails
          router.push("/dashboard");
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Handle the redirect flow by calling the Clerk.handleRedirectCallback() method
  return <AuthenticateWithRedirectCallback />;
}
