"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  ArrowLeft,
  Shield,
  Users,
  FileText,
  Activity,
  Settings,
} from "lucide-react";
import { useRouter } from "next/navigation";
import AdminStats from "@/components/dashboard/AdminStats";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-red-600"></div>
    </div>
  );
}

function AccessDenied() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="p-8 max-w-md text-center">
        <Shield className="w-16 h-16 text-red-600 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">
          You need administrator privileges to access this dashboard.
        </p>
        <Button onClick={() => (window.location.href = "/dashboard")}>
          Back to Dashboard
        </Button>
      </Card>
    </div>
  );
}

function DashboardHeader({
  email,
  onBack,
}: {
  email: string;
  onBack: () => void;
}) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center">
        <Button onClick={onBack} variant="outline" className="mr-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center">
            <Shield className="w-8 h-8 mr-3 text-red-600" />
            Admin Dashboard
          </h1>
          <p className="text-gray-600">Platform overview and management</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500">Signed in as</p>
        <p className="font-medium text-gray-900">{email}</p>
      </div>
    </div>
  );
}

function AdminNotice() {
  return (
    <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
      <div className="flex">
        <div className="flex-shrink-0">
          <Shield className="h-5 w-5 text-red-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">
            <strong>Administrator Mode:</strong> You are viewing sensitive
            platform data. Handle with care and maintain security protocols.
          </p>
        </div>
      </div>
    </div>
  );
}

function QuickAdminActions() {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Admin Actions
      </h2>
      <div className="space-y-3">
        <AdminActionButton
          icon={<FileText className="w-4 h-4 mr-3" />}
          label="Manage Posts"
          onClick={() => (window.location.href = "/admin")}
          description="View and edit all posts"
        />
        <AdminActionButton
          icon={<Users className="w-4 h-4 mr-3" />}
          label="User Management"
          disabled
          description="Coming soon"
        />
        <AdminActionButton
          icon={<Activity className="w-4 h-4 mr-3" />}
          label="Activity Logs"
          disabled
          description="Coming soon"
        />
        <AdminActionButton
          icon={<Settings className="w-4 h-4 mr-3" />}
          label="System Settings"
          disabled
          description="Coming soon"
        />
      </div>
    </Card>
  );
}

function AdminActionButton({
  icon,
  label,
  description,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  description: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      className="w-full justify-start h-auto py-3"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-start">
        {icon}
        <div className="text-left">
          <div className="font-medium">{label}</div>
          <div className="text-xs text-gray-500 mt-1">{description}</div>
        </div>
      </div>
    </Button>
  );
}

export default function AdminDashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <LoadingScreen />;

  const userRole = user?.user_metadata?.role;
  if (userRole !== "admin") {
    return <AccessDenied />;
  }

  const handleBack = () => {
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader email={user?.email ?? ""} onBack={handleBack} />

        <AdminNotice />

        <div className="mb-8">
          <AdminStats />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Recent Platform Activity
              </h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">
                      New user registered
                    </p>
                    <p className="text-sm text-gray-500">2 hours ago</p>
                  </div>
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex items-center justify-between py-3 border-b">
                  <div>
                    <p className="font-medium text-gray-900">Post published</p>
                    <p className="text-sm text-gray-500">4 hours ago</p>
                  </div>
                  <FileText className="w-5 h-5 text-green-600" />
                </div>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium text-gray-900">
                      System backup completed
                    </p>
                    <p className="text-sm text-gray-500">6 hours ago</p>
                  </div>
                  <Settings className="w-5 h-5 text-purple-600" />
                </div>
              </div>
            </Card>
          </div>

          <div>
            <QuickAdminActions />
          </div>
        </div>
      </div>
    </div>
  );
}
