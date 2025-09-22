"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogOut, User, Mail, Calendar, Shield } from "lucide-react";
import UserProfile from "@/components/dashboard/UserProfile";
import UserActivity from "@/components/dashboard/UserActivity";

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
    </div>
  );
}

function DashboardHeader({
  email,
  onLogout,
}: {
  email: string;
  onLogout: () => void;
}) {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back, {email}</p>
      </div>
      <Button onClick={onLogout} variant="outline">
        <LogOut className="w-4 h-4 mr-2" />
        Sign Out
      </Button>
    </div>
  );
}

function UserInfoCards({ user }: { user: any }) {
  const userRole = user?.user_metadata?.role || "user";
  const items = [
    {
      label: "User ID",
      value: user?.id?.slice(0, 8) + "..." || "N/A",
      icon: <User className="w-6 h-6 text-blue-600" />,
      bg: "bg-blue-100",
    },
    {
      label: "Email",
      value: user?.email,
      icon: <Mail className="w-6 h-6 text-green-600" />,
      bg: "bg-green-100",
    },
    {
      label: "Role",
      value: (
        <span
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            userRole === "admin"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {userRole === "admin" ? "Admin" : "User"}
        </span>
      ),
      icon: <Shield className="w-6 h-6 text-purple-600" />,
      bg: "bg-purple-100",
    },
    {
      label: "Joined",
      value: user?.created_at
        ? new Date(user.created_at).toLocaleDateString()
        : "N/A",
      icon: <Calendar className="w-6 h-6 text-orange-600" />,
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
      {items.map((item, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${item.bg}`}>{item.icon}</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{item.label}</p>
              <div className="text-lg font-semibold text-gray-900">
                {item.value}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function QuickActions({ userRole }: { userRole: string }) {
  const isAdmin = userRole === "admin";

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        Quick Actions
      </h2>
      <div className="space-y-3">
        <ActionButton
          icon={<User className="w-4 h-4 mr-3" />}
          label="Edit Profile"
          disabled
        />
        <ActionButton
          icon={<Mail className="w-4 h-4 mr-3" />}
          label="Change Email"
          disabled
        />
        {isAdmin && (
          <>
            <ActionButton
              icon={<Shield className="w-4 h-4 mr-3" />}
              label="Admin Panel"
              onClick={() => (window.location.href = "/admin")}
            />
            <ActionButton
              icon={<Calendar className="w-4 h-4 mr-3" />}
              label="Admin Dashboard"
              onClick={() => (window.location.href = "/admin/dashboard")}
            />
          </>
        )}
      </div>
    </Card>
  );
}

function ActionButton({
  icon,
  label,
  onClick,
  disabled = false,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <Button
      className="w-full justify-start"
      variant="outline"
      onClick={onClick}
      disabled={disabled}
    >
      {icon}
      {label}
    </Button>
  );
}

function DebugInfo({ user }: { user: any }) {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <Card className="mt-6 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Debug Info</h2>
      <pre className="bg-gray-100 p-4 rounded-md text-sm overflow-auto">
        {JSON.stringify(user, null, 2)}
      </pre>
    </Card>
  );
}

export default function DashboardPage() {
  const { user, logout, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  const handleLogout = async () => {
    await logout();
  };

  const userRole = user?.user_metadata?.role || "user";

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <DashboardHeader email={user?.email ?? ""} onLogout={handleLogout} />
        <UserInfoCards user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <UserActivity />
          </div>
          <div>
            <QuickActions userRole={userRole} />
          </div>
        </div>

        <DebugInfo user={user} />
      </div>
    </div>
  );
}
