"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Card } from "@/components/ui/card";
import LogoutButton from "@/components/auth/LogoutButton";
import Link from "next/link";

export default function TestAuthPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto">
        <Card className="p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            Authentication Test Page
          </h1>

          {user ? (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md">
                <p className="font-medium">✅ User is authenticated!</p>
                <p className="text-sm mt-1">Email: {user.email}</p>
                <p className="text-sm">ID: {user.id}</p>
              </div>

              <div className="flex gap-4">
                <LogoutButton />
                <LogoutButton showConfirmDialog variant="ghost">
                  Logout with Confirmation
                </LogoutButton>
              </div>

              <div className="pt-4 border-t">
                <h3 className="font-medium mb-2">Navigation Links:</h3>
                <div className="space-y-2">
                  <Link
                    href="/dashboard"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    → Go to Dashboard
                  </Link>
                  <Link
                    href="/admin"
                    className="block text-blue-600 hover:text-blue-800"
                  >
                    → Go to Admin Panel
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
                <p className="font-medium">❌ User is not authenticated</p>
              </div>

              <div className="space-y-2">
                <Link
                  href="/login"
                  className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Go to Login Page
                </Link>
                <br />
                <Link
                  href="/signup"
                  className="inline-block px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Go to Signup Page
                </Link>
              </div>
            </div>
          )}

          <div className="mt-8 pt-4 border-t text-center">
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              ← Back to Home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
