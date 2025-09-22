"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Settings, Database } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-red-600" />
                Admin Panel
              </h1>
              <p className="text-gray-600">Administrator Dashboard</p>
            </div>
          </div>
        </div>

        {/* Admin Notice */}
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">
                <strong>Admin Access:</strong> You are currently in the admin
                panel. Be careful with any actions you perform here.
              </p>
            </div>
          </div>
        </div>

        {/* Admin Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 rounded-full">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 rounded-full">
                <Database className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900">1</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 rounded-full">
                <Settings className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  System Status
                </p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 rounded-full">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Security Level
                </p>
                <p className="text-2xl font-bold text-green-600">High</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              User Management
            </h2>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Users className="w-4 h-4 mr-3" />
                View All Users (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Settings className="w-4 h-4 mr-3" />
                Manage Roles (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Database className="w-4 h-4 mr-3" />
                User Analytics (Coming Soon)
              </Button>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              System Settings
            </h2>
            <div className="space-y-3">
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Settings className="w-4 h-4 mr-3" />
                System Configuration (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Database className="w-4 h-4 mr-3" />
                Database Management (Coming Soon)
              </Button>
              <Button
                className="w-full justify-start"
                variant="outline"
                disabled
              >
                <Shield className="w-4 h-4 mr-3" />
                Security Settings (Coming Soon)
              </Button>
            </div>
          </Card>
        </div>

        {/* Current Admin User */}
        <Card className="mt-6 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Current Admin User
          </h2>
          <div className="bg-gray-100 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <dt className="text-sm font-medium text-gray-600">Email</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">User ID</dt>
                <dd className="mt-1 text-sm text-gray-900">{user?.id}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">Role</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    Admin
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-gray-600">
                  Last Login
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {user?.last_sign_in_at
                    ? new Date(user.last_sign_in_at).toLocaleString()
                    : "N/A"}
                </dd>
              </div>
            </div>
          </div>
        </Card>

        {/* Debug Info (development only) */}
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
