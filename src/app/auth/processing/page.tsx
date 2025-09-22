"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

function ProcessingSteps({ currentStep }: { currentStep: number }) {
  const steps = [
    "Verifying your email",
    "Creating your account",
    "Setting up your profile",
    "Finalizing registration",
  ];

  return (
    <div className="space-y-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          {index < currentStep ? (
            <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          ) : index === currentStep ? (
            <Loader2 className="w-5 h-5 text-blue-600 mr-3 animate-spin" />
          ) : (
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3" />
          )}
          <span
            className={`text-sm ${
              index <= currentStep ? "text-gray-900" : "text-gray-500"
            }`}
          >
            {step}
          </span>
        </div>
      ))}
    </div>
  );
}

function ProcessingContent() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < 3) return prev + 1;
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Card className="p-8 max-w-md text-center">
      <div className="mb-6">
        <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Processing Your Registration
        </h1>
        <p className="text-gray-600">
          Please wait while we complete your account setup.
        </p>
      </div>

      <ProcessingSteps currentStep={currentStep} />

      <div className="mt-6 text-xs text-gray-500">
        This usually takes just a few seconds...
      </div>
    </Card>
  );
}

function ProcessingError({
  error,
  onRetry,
  onGoToLogin,
}: {
  error: string;
  onRetry: () => void;
  onGoToLogin: () => void;
}) {
  return (
    <Card className="p-8 max-w-md text-center">
      <div className="mb-6">
        <AlertTriangle className="w-12 h-12 text-red-600 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Registration Failed
        </h1>
        <p className="text-gray-600">
          We encountered an issue while processing your registration.
        </p>
      </div>

      <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-6">
        <p className="text-sm text-red-700">{error}</p>
      </div>

      <div className="space-y-3">
        <Button onClick={onRetry} className="w-full">
          Try Again
        </Button>
        <Button onClick={onGoToLogin} variant="outline" className="w-full">
          Back to Login
        </Button>
      </div>
    </Card>
  );
}

function ProcessingComplete({ onContinue }: { onContinue: () => void }) {
  return (
    <Card className="p-8 max-w-md text-center">
      <div className="mb-6">
        <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-4" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Registration Complete!
        </h1>
        <p className="text-gray-600">
          Your account has been successfully created and verified.
        </p>
      </div>

      <Button onClick={onContinue} className="w-full">
        <ArrowRight className="w-4 h-4 mr-2" />
        Continue to Dashboard
      </Button>
    </Card>
  );
}

export default function ProcessingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"processing" | "complete" | "error">(
    "processing"
  );
  const [error, setError] = useState<string | null>(null);

  const redirectTo = searchParams.get("redirectTo") || "/dashboard";
  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      setStatus("error");
      setError("No verification code provided");
      return;
    }

    // Simulate processing time
    const timer = setTimeout(() => {
      setStatus("complete");
    }, 4000);

    return () => clearTimeout(timer);
  }, [code]);

  const handleRetry = () => {
    setStatus("processing");
    setError(null);
    window.location.reload();
  };

  const handleGoToLogin = () => {
    router.push("/login");
  };

  const handleContinue = () => {
    router.push(redirectTo);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {status === "processing" && <ProcessingContent />}
      {status === "error" && (
        <ProcessingError
          error={error || "Unknown error occurred"}
          onRetry={handleRetry}
          onGoToLogin={handleGoToLogin}
        />
      )}
      {status === "complete" && (
        <ProcessingComplete onContinue={handleContinue} />
      )}
    </div>
  );
}
