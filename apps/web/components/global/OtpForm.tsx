import React from "react";
import { Button } from "../ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { AlertCircle, LucideLoader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../ui/input-otp";
import { useAuth } from "@/lib/hooks/useAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const otpSchema = z.object({
  otp: z.string().min(6, { message: "Please enter a valid verification code" }),
});

type OTPFormValues = z.infer<typeof otpSchema>;

const OtpForm = () => {
  const [otpError, setOtpError] = React.useState<string | null>(null);
  // We're removing the isVerifying check as this component is only rendered when verification is needed
  const { isLoading, handleVerify } = useAuth();
  const [isResending, setIsResending] = React.useState(false);

  const otpForm = useForm<OTPFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onVerifySubmit = async (data: OTPFormValues) => {
    console.log("Submitting OTP code:", data.otp);
    setOtpError(null);

    if (!data.otp || data.otp.length !== 6) {
      setOtpError("Please enter a valid 6-digit verification code");
      return;
    }

    try {
      await handleVerify(data.otp);
    } catch (err) {
      console.error("OTP verification error:", err);
      setOtpError("Invalid verification code. Please try again.");
    }
  };

  const handleResendCode = async () => {
    console.log("Attempting to resend verification code");
    setOtpError(null);
    setIsResending(true);
    try {
      //   await resendVerificationCode();
      // Clear the OTP input after resending
      otpForm.reset({ otp: "" });
    } catch (err) {
      console.error("Failed to resend code:", err);
      setOtpError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // We always want to show the OTP form when this component is rendered
  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-opacity-50 transition-all duration-300 hover:shadow-xl">
      <CardHeader className="space-y-1 text-center pb-6">
        <CardTitle className="text-2xl font-bold tracking-tight">
          Verify your email
        </CardTitle>
        <CardDescription>
          We've sent a verification code to your email. Please enter it below.
        </CardDescription>
      </CardHeader>

      <div className="px-6 pb-6">
        {otpError && (
          <div className="mb-5 p-3 bg-destructive/10 text-destructive rounded-md flex items-center gap-2 animate-in fade-in-50 duration-300">
            <AlertCircle className="h-4 w-4 flex-shrink-0" />
            <p className="text-sm">{otpError}</p>
          </div>
        )}

        {isLoading && (
          <div className="mb-5 p-3 bg-primary/10 text-primary rounded-md flex items-center gap-2 animate-in fade-in-50 duration-300">
            <LucideLoader2 className="h-4 w-4 flex-shrink-0 animate-spin" />
            <p className="text-sm">Processing your request...</p>
          </div>
        )}

        <Form {...otpForm}>
          <form
            onSubmit={otpForm.handleSubmit(onVerifySubmit)}
            className="space-y-6"
          >
            <FormField
              control={otpForm.control}
              name="otp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      containerClassName="justify-center gap-2"
                      value={field.value}
                      onChange={(value) => {
                        console.log("OTP value changed:", value);
                        field.onChange(value);
                      }}
                      disabled={isLoading}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, i) => (
                          <InputOTPSlot
                            key={i}
                            index={i}
                            className="rounded-md border h-12 w-10 text-center text-lg focus:border-primary"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full transition-all duration-300 hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LucideLoader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                "Verify Email"
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center text-sm">
          Didn't receive a code?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResending || isLoading}
            className="text-primary font-medium hover:underline transition-colors duration-200"
          >
            {isResending ? "Sending..." : "Resend code"}
          </button>
        </div>
      </div>
    </Card>
  );
};

export default OtpForm;
