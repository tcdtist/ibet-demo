"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Card } from "@/components/ui/card";
import { User, Mail, Calendar, Shield } from "lucide-react";

function ProfileCard({
  icon,
  label,
  value,
  bgColor,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | React.ReactNode;
  bgColor: string;
}) {
  return (
    <div className="flex items-center p-4 bg-white rounded-lg border border-gray-200">
      <div className={`p-3 rounded-full ${bgColor}`}>{icon}</div>
      <div className="ml-4">
        <p className="text-sm font-medium text-gray-600">{label}</p>
        <p className="text-lg font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const isAdmin = role === "admin";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isAdmin ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"
      }`}
    >
      {isAdmin ? "Admin" : "User"}
    </span>
  );
}

function LoadingState() {
  return (
    <Card className="p-6">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-24 mb-4"></div>
        <div className="space-y-3">
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
          <div className="h-16 bg-gray-200 rounded"></div>
        </div>
      </div>
    </Card>
  );
}

export default function UserProfile() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;
  if (!user) return null;

  const userRole = user.user_metadata?.role || "user";
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">User Profile</h2>

      <div className="space-y-4">
        <ProfileCard
          icon={<User className="w-5 h-5 text-blue-600" />}
          label="User ID"
          value={user.id.slice(0, 8) + "..."}
          bgColor="bg-blue-100"
        />

        <ProfileCard
          icon={<Mail className="w-5 h-5 text-green-600" />}
          label="Email"
          value={user.email || "N/A"}
          bgColor="bg-green-100"
        />

        <ProfileCard
          icon={<Shield className="w-5 h-5 text-purple-600" />}
          label="Role"
          value={<RoleBadge role={userRole} />}
          bgColor="bg-purple-100"
        />

        <ProfileCard
          icon={<Calendar className="w-5 h-5 text-orange-600" />}
          label="Member Since"
          value={joinedDate}
          bgColor="bg-orange-100"
        />
      </div>
    </Card>
  );
}
