"use client";

import { useState, useEffect } from "react";
import { createClientComponentClient } from "@/lib/supabase";

interface OAuthConfig {
  google: boolean;
  github: boolean;
  discord: boolean;
}

function LoadingProviders() {
  return (
    <div className="animate-pulse">
      <div className="h-10 bg-gray-200 rounded w-full mb-2"></div>
      <div className="text-xs text-gray-500">
        Checking available login options...
      </div>
    </div>
  );
}

function ProviderStatus({ enabled, name }: { enabled: boolean; name: string }) {
  return (
    <div className="flex items-center justify-between py-2 px-3 border rounded text-sm">
      <span>{name}</span>
      <span
        className={`text-xs font-medium ${
          enabled ? "text-green-600" : "text-red-600"
        }`}
      >
        {enabled ? "Available" : "Disabled"}
      </span>
    </div>
  );
}

export default function OAuthProviderCheck({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [config, setConfig] = useState<OAuthConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const checkProviders = async () => {
      try {
        const supabase = createClientComponentClient();

        // Try to get auth config (this will fail gracefully)
        // In production, you might want to call a custom API endpoint that checks config
        const testConfig: OAuthConfig = {
          google: false,
          github: false,
          discord: false,
        };

        // Test Google provider
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
              skipBrowserRedirect: true,
            },
          });

          // If error doesn't contain "not enabled", provider is available
          if (
            !error?.message.includes("provider is not enabled") &&
            !error?.message.includes("Unsupported provider")
          ) {
            testConfig.google = true;
          }
        } catch (err) {
          // Provider check failed, assume disabled
        }

        setConfig(testConfig);
      } catch (error) {
        console.warn("Failed to check OAuth providers:", error);
        // Set all to false on error
        setConfig({
          google: false,
          github: false,
          discord: false,
        });
      } finally {
        setLoading(false);
      }
    };

    checkProviders();
  }, []);

  if (loading) {
    return <LoadingProviders />;
  }

  const hasAnyProvider = config && Object.values(config).some(Boolean);

  return (
    <div className="space-y-4">
      {children}

      {process.env.NODE_ENV === "development" && (
        <div className="border-t pt-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-xs text-gray-500 hover:text-gray-700"
          >
            {showDetails ? "Hide" : "Show"} OAuth Provider Status
          </button>

          {showDetails && config && (
            <div className="mt-2 space-y-1">
              <ProviderStatus enabled={config.google} name="Google" />
              {!hasAnyProvider && (
                <div className="text-xs text-amber-600 bg-amber-50 p-2 rounded mt-2">
                  ⚠️ No OAuth providers are enabled. Configure them in your
                  Supabase dashboard.
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
