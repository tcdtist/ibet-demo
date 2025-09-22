"use client";

import { useAuth } from "@/lib/providers/supabase-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Plus, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PostList from "@/components/cms/PostList";

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
    <div>
      {/* Navigation */}
      <div className="flex items-center justify-between mb-8">
        <Button onClick={() => router.push("/dashboard")} variant="outline">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>

        <Link href="/admin/new">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Content Management Section */}
      <Card className="p-6 mb-8">
        <div className="flex items-center mb-4">
          <FileText className="w-6 h-6 mr-3 text-blue-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Posts Management
          </h2>
        </div>

        <PostList />
      </Card>

      {/* Admin User Info */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Current Admin User
        </h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-600">Email:</span>{" "}
              <span className="text-gray-900">{user?.email}</span>
            </div>
            <div>
              <span className="font-medium text-gray-600">User ID:</span>{" "}
              <span className="text-gray-900 font-mono text-xs">
                {user?.id}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
