"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, User, Mail, Calendar } from "lucide-react";

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user?.email}</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        {/* User Info Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">User ID</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.id}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Email</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.email}
                </p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Calendar className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Joined</p>
                <p className="text-lg font-semibold text-gray-900">
                  {user?.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Account Information
            </h2>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <dt className="text-sm font-medium text-gray-600">Full Name</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.user_metadata?.full_name ||
                    user?.user_metadata?.name ||
                    "Not provided"}
                </dd>
              </div>
              <div className="border-b pb-4">
                <dt className="text-sm font-medium text-gray-600">
                  Email Verified
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.email_confirmed_at ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                      Pending
                    </span>
                  )}
                </dd>
              </div>
              <div className="border-b pb-4">
                <dt className="text-sm font-medium text-gray-600">
                  Authentication Provider
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.app_metadata?.provider || "email"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  Last Sign In
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "N/A"}
                </dd>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <User className="w-4 h-4 mr-3" />
                Edit Profile (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Mail className="w-4 h-4 mr-3" />
                Change Email (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                onClick={() => (window.location.href = "/admin")}
              >
                <Calendar className="w-4 h-4 mr-3" />
                Admin Panel
              </Button>
            </div>
          </Card>
        </div>

        {/* Debug Info (only in development) */}
        {process.env.NODE_ENV === "development" && (
          <Card className="mt-6 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Debug Info
            </h2>
            <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
              {JSON.stringify(user, null, 2)}
            </pre>
          </Card>
        )}
      </div>
    </div>
  );
}
