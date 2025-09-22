"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/providers/supabase-provider";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, User, Mail, ArrowRight, Loader2 } from "lucide-react";

function LoadingWelcome() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 max-w-md text-center">
        <Loader2 className="w-12 h-12 text-blue-600 mx-auto mb-4 animate-spin" />
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Setting up your account...
        </h1>
        <p className="text-gray-600">
          Please wait while we complete your registration.
        </p>
      </Card>
    </div>
  );
}

function WelcomeContent({
  user,
  onContinue,
}: {
  user: any;
  onContinue: () => void;
}) {
  return (
    <Card className="p-8 max-w-md text-center">
      <div className="mb-6">
        <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome to iGaming Demo!
        </h1>
        <p className="text-gray-600">
          Your account has been successfully created and verified.
        </p>
      </div>

      <div className="space-y-4 mb-8">
        <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
          <div className="flex items-center">
            <Mail className="w-5 h-5 text-green-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-green-800">
                Email Verified
              </p>
              <p className="text-xs text-green-600">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
          <div className="flex items-center">
            <User className="w-5 h-5 text-blue-600 mr-3" />
            <div className="text-left">
              <p className="text-sm font-medium text-blue-800">
                Account Created
              </p>
              <p className="text-xs text-blue-600">Ready to explore</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={onContinue} className="w-full">
          <ArrowRight className="w-4 h-4 mr-2" />
          Continue to Dashboard
        </Button>

        <p className="text-xs text-gray-500">
          You can now access all features of the platform
        </p>
      </div>
    </Card>
  );
}

function WelcomeError({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <Card className="p-8 max-w-md text-center">
      <div className="text-red-600 mb-4">
        <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
          <span className="text-2xl">⚠️</span>
        </div>
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome Setup Failed
        </h1>
        <p className="text-gray-600 mb-4">
          There was an issue completing your account setup.
        </p>
        <div className="bg-red-50 border border-red-200 p-3 rounded text-sm text-red-700">
          {error}
        </div>
      </div>

      <div className="space-y-3">
        <Button onClick={onRetry} variant="outline" className="w-full">
          Try Again
        </Button>
        <Button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full"
        >
          Continue to Dashboard
        </Button>
      </div>
    </Card>
  );
}

export default function WelcomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, loading } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  useEffect(() => {
    // If not loading and no user, redirect to login
    if (!loading && !user) {
      router.push("/login?error=session_expired");
      return;
    }
  }, [user, loading, router]);

  const handleContinue = () => {
    router.push(redirectTo);
  };

  const handleRetry = () => {
    setError(null);
    // Optionally refresh the page or retry auth check
    window.location.reload();
  };

  if (loading) {
    return <LoadingWelcome />;
  }

  if (!user) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      {error ? (
        <WelcomeError error={error} onRetry={handleRetry} />
      ) : (
        <WelcomeContent user={user} onContinue={handleContinue} />
      )}
    </div>
  );
}
