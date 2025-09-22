"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";

function VerificationSuccess() {
  return (
    <Card className="p-8 max-w-md text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Email Verified!</h1>
      <p className="text-gray-600 mb-6">
        Your email has been successfully verified. You can now access your
        account.
      </p>
      <Button
        onClick={() => (window.location.href = "/dashboard")}
        className="w-full"
      >
        Continue to Dashboard
      </Button>
    </Card>
  );
}

function VerificationPending() {
  return (
    <Card className="p-8 max-w-md text-center">
      <Mail className="w-16 h-16 text-blue-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Check Your Email
      </h1>
      <p className="text-gray-600 mb-6">
        We've sent you a verification link. Please check your email and click
        the link to verify your account.
      </p>

      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-6 text-left">
        <h3 className="font-medium text-blue-900 mb-2">
          Didn't receive the email?
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
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

export default function VerifyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"pending" | "success" | "error">(
    "pending"
  );
  const [error, setError] = useState<string | null>(null);

  const token = searchParams.get("token");
  const type = searchParams.get("type");
  const email = searchParams.get("email");

  useEffect(() => {
    // Check if we have verification parameters
    if (token && type === "email") {
      // In a real app, you would verify the token here
      // For now, we'll simulate verification
      setStatus("success");
    } else if (email) {
      // Show pending state if we only have email (waiting for verification)
      setStatus("pending");
    } else {
      setStatus("error");
      setError("Invalid verification link");
    }
  }, [token, type, email]);

  const handleRetry = () => {
    setStatus("pending");
    setError(null);
    // Could trigger resend verification email here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "pending" && <VerificationPending />}
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
