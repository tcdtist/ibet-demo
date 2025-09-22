"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, AlertTriangle, ArrowRight } from "lucide-react";

function ProcessingRegistration() {
  return (
    <Card className="p-8 max-w-md text-center">
      <Loader2 className="w-16 h-16 text-blue-600 mx-auto mb-4 animate-spin" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Completing Registration
      </h1>
      <p className="text-gray-600 mb-6">Processing your verification code...</p>
      <div className="text-sm text-gray-500">
        Code:{" "}
        <span className="font-mono bg-gray-100 px-2 py-1 rounded">{}</span>
      </div>
    </Card>
  );
}

function RegistrationComplete() {
  return (
    <Card className="p-8 max-w-md text-center">
      <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Welcome to iGaming Demo!
      </h1>
      <p className="text-gray-600 mb-6">
        Your account has been successfully created and verified.
      </p>

      <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-green-700">Account Status:</span>
          <span className="text-green-800 font-medium">✅ Verified</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-green-700">Access Level:</span>
          <span className="text-green-800 font-medium">Full Access</span>
        </div>
      </div>

      <Button
        className="w-full"
        onClick={() => (window.location.href = "/dashboard")}
      >
        <ArrowRight className="w-4 h-4 mr-2" />
        Continue to Dashboard
      </Button>
    </Card>
  );
}

function RegistrationError({
  error,
  code,
  onRetry,
}: {
  error: string;
  code?: string;
  onRetry: () => void;
}) {
  return (
    <Card className="p-8 max-w-md text-center">
      <AlertTriangle className="w-16 h-16 text-red-600 mx-auto mb-4" />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Registration Failed
      </h1>
      <p className="text-gray-600 mb-4">
        We couldn't complete your registration.
      </p>

      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6 text-left">
        <p className="text-sm text-red-700 mb-2">{error}</p>
        {code && (
          <div className="text-xs text-red-600 font-mono">Code: {code}</div>
        )}
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

export default function CompleteRegistrationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "complete" | "error">(
    "processing"
  );
  const [error, setError] = useState<string | null>(null);

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      setError("No verification code provided");
      return;
    }

    // Simulate processing the verification code
    const processVerification = async () => {
      try {
        // In a real app, this would call your auth callback API
        const response = await fetch(
          `/auth/callback?code=${encodeURIComponent(code)}`
        );

        if (response.ok && response.redirected) {
          setStatus("complete");
        } else {
          setStatus("error");
          setError("Failed to verify registration code");
        }
      } catch (err) {
        setStatus("error");
        setError(err instanceof Error ? err.message : "Verification failed");
      }
    };

    // Add a small delay for better UX
    const timer = setTimeout(processVerification, 2000);
    return () => clearTimeout(timer);
  }, [code]);

  const handleRetry = () => {
    setStatus("processing");
    setError(null);
    window.location.reload();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "processing" && <ProcessingRegistration />}
      {status === "complete" && <RegistrationComplete />}
      {status === "error" && (
        <RegistrationError
          error={error || "Unknown error occurred"}
          code={code || undefined}
          onRetry={handleRetry}
        />
      )}
    </div>
  );
}
