"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signup } from "@/lib/auth/hooks";
import {
  Mail,
  Send,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
} from "lucide-react";

function TestVerificationForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("testpassword123");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    message: string;
    details?: string;
  } | null>(null);

  const handleTestSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setResult({
        success: false,
        message: "Please enter an email address",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data, error } = await signup(email, password);

      if (error) {
        setResult({
          success: false,
          message: "Signup failed",
          details: error.message,
        });
      } else if (data?.user && !data.user.email_confirmed_at) {
        setResult({
          success: true,
          message: "Signup successful! Check your email for verification link.",
          details: `Verification email sent to ${email}`,
        });
      } else {
        setResult({
          success: true,
          message: "Account created and verified!",
          details: "You can now login",
        });
      }
    } catch (err) {
      setResult({
        success: false,
        message: "Unexpected error occurred",
        details: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Test Email Verification</h2>

      <form onSubmit={handleTestSignup} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            value={email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password (auto-filled)
          </label>
          <input
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            placeholder="Password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-100"
            disabled
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Testing Signup...
            </div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Test Signup & Verification
            </>
          )}
        </Button>
      </form>

      {result && (
        <div
          className={`mt-4 p-4 rounded-lg border ${
            result.success
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}
        >
          <div className="flex items-start">
            {result.success ? (
              <CheckCircle className="w-5 h-5 text-green-600 mr-3 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-red-600 mr-3 mt-0.5" />
            )}
            <div className="flex-1">
              <p
                className={`font-medium ${
                  result.success ? "text-green-900" : "text-red-900"
                }`}
              >
                {result.message}
              </p>
              {result.details && (
                <p
                  className={`text-sm mt-1 ${
                    result.success ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.details}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

function CallbackTestSection() {
  const [testCode, setTestCode] = useState(
    "9f20e5b7-ed1c-4551-9ad6-6d0f699e341f"
  );

  const testCallback = () => {
    const callbackUrl = `/auth/callback?code=${encodeURIComponent(
      testCode
    )}&redirectTo=${encodeURIComponent("/dashboard")}`;
    window.open(callbackUrl, "_blank");
  };

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Test Auth Callback</h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Verification Code
          </label>
          <input
            type="text"
            value={testCode}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setTestCode(e.target.value)
            }
            placeholder="Enter verification code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-xs"
          />
          <p className="text-xs text-gray-500 mt-1">
            This simulates the code from your URL:
            ?code=9f20e5b7-ed1c-4551-9ad6-6d0f699e341f
          </p>
        </div>

        <Button onClick={testCallback} variant="outline" className="w-full">
          <ExternalLink className="w-4 h-4 mr-2" />
          Test Callback Processing
        </Button>
      </div>

      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded text-sm">
        <p className="font-medium text-blue-900 mb-1">How it works:</p>
        <ol className="text-blue-700 space-y-1 text-xs">
          <li>1. User clicks verification link in email</li>
          <li>2. Supabase redirects to /auth/callback with code</li>
          <li>3. Our handler exchanges code for session</li>
          <li>4. User is redirected to welcome page or dashboard</li>
        </ol>
      </div>
    </Card>
  );
}

function VerificationFlowGuide() {
  const steps = [
    {
      title: "User Signs Up",
      description: "Fill out signup form with email/password",
      status: "ready",
    },
    {
      title: "Email Sent",
      description: "Supabase sends verification email",
      status: "ready",
    },
    {
      title: "User Clicks Link",
      description: "Email contains link with verification code",
      status: "testing",
    },
    {
      title: "Callback Processing",
      description: "Our app exchanges code for session",
      status: "ready",
    },
    {
      title: "Welcome Flow",
      description: "New users see welcome page, then dashboard",
      status: "ready",
    },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Verification Flow</h2>

      <div className="space-y-3">
        {steps.map((step, index) => (
          <div key={index} className="flex items-start">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium mr-3 mt-0.5 ${
                step.status === "ready"
                  ? "bg-green-100 text-green-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {index + 1}
            </div>
            <div>
              <p className="font-medium text-gray-900">{step.title}</p>
              <p className="text-sm text-gray-600">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default function TestVerificationPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Email Verification Testing
          </h1>
          <p className="text-gray-600">
            Test the complete email verification flow from signup to dashboard
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <TestVerificationForm />
            <CallbackTestSection />
          </div>

          <div>
            <VerificationFlowGuide />
          </div>
        </div>

        <Card className="p-6">
          <h3 className="font-medium text-gray-900 mb-3">
            Quick Links for Testing
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
            <a
              href="/auth/welcome?redirectTo=/dashboard"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
            >
              Welcome Page
            </a>
            <a
              href="/auth/processing?code=test"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
            >
              Processing Page
            </a>
            <a
              href="/auth/verify?email=test@example.com"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
            >
              Verify Page
            </a>
            <a
              href="/login?error=test_error"
              className="text-blue-600 hover:text-blue-800 underline"
              target="_blank"
            >
              Login with Error
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
}
