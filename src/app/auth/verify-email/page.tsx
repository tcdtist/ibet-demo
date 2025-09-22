"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Clock,
} from "lucide-react";

function VerificationInstructions({ email }: { email: string }) {
  return (
    <Card className="p-8 max-w-md text-center">
      <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Check Your Email
      </h1>
      <p className="text-gray-600 mb-6">
        We've sent a verification link to{" "}
        <span className="font-medium">{email}</span>
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-medium text-blue-900 mb-3">Next Steps:</h3>
        <div className="space-y-2">
          <div className="flex items-start">
            <div className="bg-blue-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </div>
            <p className="text-sm text-blue-700">Check your email inbox</p>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </div>
            <p className="text-sm text-blue-700">Click the verification link</p>
          </div>
          <div className="flex items-start">
            <div className="bg-blue-500 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </div>
            <p className="text-sm text-blue-700">Complete your registration</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-medium text-amber-800 mb-2">
          Didn't receive the email?
        </h3>
        <ul className="text-sm text-amber-700 space-y-1">
          <li>• Check your spam/junk folder</li>
          <li>• Make sure you entered the correct email address</li>
          <li>• Wait a few minutes for the email to arrive</li>
        </ul>
      </div>

      <div className="space-y-3">
        <Button variant="outline" className="w-full">
          <RefreshCw className="w-4 h-4 mr-2" />
          Resend Verification Email
        </Button>
        <Button
          onClick={() => (window.location.href = "/login")}
          variant="ghost"
          className="w-full"
        >
          Back to Login
        </Button>
      </div>
    </Card>
  );
}

function VerificationPending() {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  return (
    <Card className="p-8 max-w-md text-center">
      <Clock className="w-16 h-16 text-orange-500 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Verification in Progress
      </h1>
      <p className="text-gray-600 mb-4">
        Processing your email verification...
      </p>

      <div className="bg-orange-50 border border-orange-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-orange-700">
          Automatically checking for verification every few seconds.
        </p>
        {countdown > 0 && (
          <p className="text-xs text-orange-600 mt-1">
            Next check in {countdown} seconds...
          </p>
        )}
      </div>

      <Button variant="outline" className="w-full">
        Check Again Now
      </Button>
    </Card>
  );
}

function VerificationSuccess() {
  return (
    <Card className="p-8 max-w-md text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
      <p className="text-gray-600 mb-6">
        Your email has been successfully verified. Welcome to iGaming Demo!
      </p>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-green-700 font-medium">
          🎉 Registration completed successfully!
        </p>
        <p className="text-xs text-green-600 mt-1">
          You now have full access to your account
        </p>
      </div>

      <Button
        onClick={() => (window.location.href = "/dashboard")}
        className="w-full"
      >
        Continue to Dashboard
      </Button>
    </Card>
  );
}

function VerificationError({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <Card className="p-8 max-w-md text-center">
      <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Verification Failed
      </h1>
      <p className="text-gray-600 mb-4">
        We couldn't verify your email address.
      </p>

      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-red-700">{error}</p>
      </div>

      <div className="space-y-3">
        <Button onClick={onRetry} className="w-full">
          Try Again
        </Button>
        <Button
          onClick={() => (window.location.href = "/signup")}
          variant="outline"
          className="w-full"
        >
          Sign Up Again
        </Button>
      </div>
    </Card>
  );
}

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<
    "pending" | "verifying" | "success" | "error"
  >("pending");
  const [error, setError] = useState<string | null>(null);

  const email = searchParams.get("email");
  const token = searchParams.get("token");
  const type = searchParams.get("type");

  useEffect(() => {
    // If we have a token, we're coming from a verification link
    if (token && type === "email") {
      setStatus("verifying");

      // Simulate verification process
      setTimeout(() => {
        setStatus("success");
      }, 2000);
    } else if (!email) {
      setStatus("error");
      setError("No email address provided");
    }
  }, [token, type, email]);

  const handleRetry = () => {
    setStatus("pending");
    setError(null);
  };

  if (!email && status !== "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <VerificationError
          error="No email address provided"
          onRetry={() => router.push("/signup")}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "pending" && <VerificationInstructions email={email!} />}
      {status === "verifying" && <VerificationPending />}
      {status === "success" && <VerificationSuccess />}
      {status === "error" && (
        <VerificationError
          error={error || "Verification failed"}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
