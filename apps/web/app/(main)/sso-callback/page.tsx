"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { handleOAuthCallback } from "@/actions/oauth-callback";
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
          console.log("OAuth login: User data loaded, calling server action");

          // Call the server action to handle the user sync
          // But don't wait for it - let the dashboard page handle this
          handleOAuthCallback().catch((err) => {
            console.error("Background sync error:", err);
          });

          // Navigate to dashboard with a flag indicating this is from OAuth
          // This allows our dashboard page to ensure the user is in the database
          router.push("/dashboard?from_oauth=true");
        } catch (error) {
          console.error("Error in OAuth callback:", error);
          // Continue to dashboard even if sync fails
          router.push("/dashboard?from_oauth=true&sync_error=true");
        }
      };

      syncUser();
    } else if (isLoaded && !isSignedIn) {
      console.log("OAuth callback: User is not signed in");
      router.push("/login");
    }
  }, [isLoaded, isSignedIn, user, router]);

  // Handle the redirect flow
  return <AuthenticateWithRedirectCallback />;
}
