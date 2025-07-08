"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useSignIn } from "@clerk/nextjs";
import { useSignUp } from "@clerk/nextjs";

interface AuthData {
  email: string;
  password: string;
}

interface UseAuthReturn {
  isLoading: boolean;
  isVerifying?: boolean;
  login: (data: AuthData) => Promise<void>;
  googleLogin: () => Promise<void>;
  signup: (data: AuthData) => Promise<void>;
  handleVerify: (code: string) => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const router = useRouter();
  const { signIn, isLoaded, setActive } = useSignIn();
  const {
    signUp,
    isLoaded: signUpLoaded,
    setActive: signUpActive,
  } = useSignUp();

  const login = async (data: AuthData) => {
    setIsLoading(true);

    if (!isLoaded) {
      return;
    }

    try {
      const loginAttempt = await signIn?.create({
        identifier: data.email,
        password: data.password,
      });

      if (loginAttempt?.status === "complete") {
        await setActive({
          session: loginAttempt.createdSessionId,
        });
        router.push("/dashboard");
        toast("Success!", {
          description: "You have successfully logged in.",
        });
      } else {
        toast.error("Login failed. Please check your credentials.");
        console.error(JSON.stringify(loginAttempt, null, 2));
      }
    } catch (err) {
      toast.error("Invalid email or password. Please try again.");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const googleLogin = async () => {
    setIsLoading(true);

    if (!signUpLoaded) {
      return;
    }

    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/dashboard",
      });
      toast.success("Authentication successful! Redirecting...");
    } catch (err) {
      toast.error("Failed to login with Google. Please try again.");
      console.error(JSON.stringify(err, null, 2));
    } finally {
      setIsLoading(false);
    }
  };
  const signup = async (data: AuthData) => {
    setIsLoading(true);

    if (!signUpLoaded) {
      console.error("Clerk signup is not loaded yet");
      toast.error("Authentication service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Starting signup process...");

      if (!signUp) {
        console.error("signUp object is undefined or null");
        toast.error("Authentication service unavailable");
        return;
      }

      const signUpAttempt = await signUp.create({
        emailAddress: data.email,
        password: data.password,
      });

      if (!signUpAttempt) {
        console.error("signUpAttempt is undefined or null");
        toast.error("Failed to create account - no response from auth service");
        return;
      }

      await signUpAttempt.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setIsVerifying(true);
      toast.success("Signup successful! Please verify your email.");
      // Removed router.push("/dashboard") to allow verification flow
    } catch (error) {
      console.error("Signup error:", error);

      // More detailed error handling
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}, message: ${error.message}`);
        toast.error(`Failed to create account: ${error.message}`);
      } else {
        console.error("Unknown error format:", JSON.stringify(error, null, 2));
        toast.error("Failed to create account. Please try again.");
      }
      setIsVerifying(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    if (!signUpLoaded) {
      console.error("Signup not loaded or undefined");
      toast.error("Authentication service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const verificationAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (verificationAttempt?.status === "complete") {
        await signUpActive({
          session: verificationAttempt.createdSessionId,
        });
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      } else {
        console.error("Verification not complete:", verificationAttempt);
        resendVerificationCode(verificationAttempt);
      }
    } catch (error) {
      console.error("Verification error:", error);
      if (error instanceof Error) {
        console.error(`Error name: ${error.name}, message: ${error.message}`);

        // Provide more helpful error messages based on the error
        if (
          error.message.includes("invalid") ||
          error.message.includes("expired")
        ) {
          toast.error(
            "Invalid or expired verification code. Please try again or request a new code."
          );
        } else {
          toast.error(`Verification failed: ${error.message}`);
        }
      } else {
        console.error("Unknown error format:", JSON.stringify(error, null, 2));
        toast.error("An error occurred during email verification.");
      }
    } finally {
      setIsLoading(false);
      setIsVerifying(false);
    }
  };
  const resendVerificationCode = async (attempt: any) => {
    setIsLoading(true);
    if (!signUpLoaded) {
      console.error("Signup not loaded or undefined");
      toast.error("Authentication service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      console.log("Attempting to resend verification code");

      await attempt.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      console.log("Verification code resent successfully");
      toast.success("Verification code resent successfully!");
    } catch (error) {
      console.error("Failed to resend verification code:", error);
      if (error instanceof Error) {
        toast.error(`Failed to resend code: ${error.message}`);
      } else {
        toast.error("Failed to resend verification code. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    isVerifying,
    login,
    googleLogin,
    signup,
    handleVerify,
  };
}
