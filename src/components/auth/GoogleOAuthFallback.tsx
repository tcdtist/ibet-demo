"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chrome, AlertCircle, ExternalLink } from "lucide-react";

function SetupInstructions() {
  return (
    <div className="space-y-4 text-sm">
      <div className="bg-blue-50 border border-blue-200 text-blue-700 p-4 rounded-md">
        <div className="flex items-start">
          <AlertCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium mb-2">Google OAuth is not configured</p>
            <p>
              To enable Google login, you need to configure it in your Supabase
              project.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Quick Setup:</h4>
        <div className="space-y-2 text-gray-600">
          <div className="flex items-start">
            <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              1
            </span>
            <span>
              Go to your Supabase Dashboard → Authentication → Providers
            </span>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              2
            </span>
            <span>Enable Google provider and add your OAuth credentials</span>
          </div>
          <div className="flex items-start">
            <span className="bg-blue-100 text-blue-800 w-5 h-5 rounded-full text-xs flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
              3
            </span>
            <span>Restart your development server</span>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button asChild variant="outline" size="sm" className="text-xs">
          <a
            href="https://supabase.com/docs/guides/auth/social-login/auth-google"
            target="_blank"
            rel="noopener noreferrer"
          >
            <ExternalLink className="w-3 h-3 mr-2" />
            Setup Guide
          </a>
        </Button>
        <Button asChild variant="outline" size="sm" className="text-xs">
          <a
            href="/docs/OAUTH_SETUP.md"
            target="_blank"
            rel="noopener noreferrer"
          >
            Local Docs
          </a>
        </Button>
      </div>
    </div>
  );
}

export default function GoogleOAuthFallback({
  onTryAgain,
  showSetupGuide = false,
}: {
  onTryAgain?: () => void;
  showSetupGuide?: boolean;
}) {
  const [showInstructions, setShowInstructions] = useState(showSetupGuide);

  return (
    <div className="space-y-4">
      <Button
        type="button"
        variant="outline"
        className="w-full"
        disabled
        title="Google OAuth is not configured"
      >
        <Chrome className="w-4 h-4 mr-2 opacity-50" />
        Google OAuth Unavailable
      </Button>

      {process.env.NODE_ENV === "development" && (
        <div className="text-center">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="text-xs text-blue-600 hover:text-blue-800 underline"
          >
            {showInstructions ? "Hide setup guide" : "Show setup guide"}
          </button>
        </div>
      )}

      {showInstructions && <SetupInstructions />}

      {onTryAgain && (
        <div className="text-center">
          <button
            onClick={onTryAgain}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Try again after configuration
          </button>
        </div>
      )}
    </div>
  );
}
