"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import GoogleOAuthFallback from "@/components/auth/GoogleOAuthFallback";
import { loginWithGoogle } from "@/lib/auth/hooks";
import { AlertTriangle, CheckCircle, Chrome } from "lucide-react";

export default function TestOAuthPage() {
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
    error?: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const testGoogleOAuth = async () => {
    setLoading(true);
    setTestResult(null);

    try {
      const { error } = await loginWithGoogle();

      if (error) {
        if (
          error.message.includes("provider is not enabled") ||
          error.message.includes("Unsupported provider")
        ) {
          setTestResult({
            success: false,
            message: "Google OAuth is not configured (expected)",
            error: error.message,
          });
        } else {
          setTestResult({
            success: false,
            message: "OAuth configuration issue",
            error: error.message,
          });
        }
      } else {
        setTestResult({
          success: true,
          message: "Google OAuth is working correctly!",
        });
      }
    } catch (err) {
      setTestResult({
        success: false,
        message: "Unexpected error occurred",
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            OAuth Configuration Test
          </h1>

          <div className="space-y-4">
            <p className="text-gray-600">
              This page helps you test and configure Google OAuth for your
              application.
            </p>

            <div className="bg-amber-50 border border-amber-200 text-amber-700 p-4 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Current Issue</p>
                  <p className="text-sm">
                    Getting error: "Unsupported provider: provider is not
                    enabled"
                  </p>
                </div>
              </div>
            </div>

            <Button
              onClick={testGoogleOAuth}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Testing Google OAuth...
                </div>
              ) : (
                <>
                  <Chrome className="w-4 h-4 mr-2" />
                  Test Google OAuth
                </>
              )}
            </Button>

            {testResult && (
              <div
                className={`border p-4 rounded-md ${
                  testResult.success
                    ? "bg-green-50 border-green-200 text-green-700"
                    : "bg-red-50 border-red-200 text-red-700"
                }`}
              >
                <div className="flex items-start">
                  {testResult.success ? (
                    <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
                  )}
                  <div>
                    <p className="font-medium">{testResult.message}</p>
                    {testResult.error && (
                      <pre className="text-xs mt-2 bg-black bg-opacity-10 p-2 rounded overflow-x-auto">
                        {testResult.error}
                      </pre>
                    )}
                  </div>
                </div>
              </div>
            )}

            <GoogleOAuthFallback
              showSetupGuide={true}
              onTryAgain={testGoogleOAuth}
            />
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Fix Steps</h2>
          <div className="space-y-3 text-sm">
            <div className="flex items-start">
              <div className="bg-blue-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                1
              </div>
              <div>
                <p className="font-medium">Open Supabase Dashboard</p>
                <p className="text-gray-600">
                  Go to app.supabase.com → Your Project
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                2
              </div>
              <div>
                <p className="font-medium">Enable Google Provider</p>
                <p className="text-gray-600">
                  Authentication → Providers → Google → Enable
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-blue-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                3
              </div>
              <div>
                <p className="font-medium">Add OAuth Credentials</p>
                <p className="text-gray-600">
                  Get Client ID/Secret from Google Cloud Console
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="bg-green-500 text-white w-6 h-6 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5">
                ✓
              </div>
              <div>
                <p className="font-medium">Test Again</p>
                <p className="text-gray-600">
                  Click the test button above to verify
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
