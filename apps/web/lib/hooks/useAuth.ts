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
      return;
    }

    try {
      const signUpAttempt = await signUp?.create({
        emailAddress: data.email,
        password: data.password,
      });

      await signUpAttempt?.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setIsVerifying(true);
      toast.success("Signup successful! Redirecting...");
      router.push("/dashboard");
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
    }
  };

  const handleVerify = async (code: string) => {
    setIsLoading(true);
    if (!signUpLoaded) {
      return;
    }

    try {
      const verificationAttempt = await signUp?.attemptEmailAddressVerification(
        {
          code,
        }
      );

      if (verificationAttempt.status === "complete") {
        await signUpActive({
          session: verificationAttempt.createdSessionId,
        });
        toast.success("Email verified successfully!");
        router.push("/dashboard");
      } else {
        toast.error("Email verification failed. Please try again.");
      }
    } catch (error) {
      console.error(JSON.stringify(error, null, 2));
      toast.error("An error occurred during email verification.");
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
