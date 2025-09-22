"use client";

import useSWR from "swr";
import { Card } from "@/components/ui/card";
import { Users, FileText, Activity, TrendingUp } from "lucide-react";

type AdminStatsData = {
  users: number;
  posts: number;
  published_posts: number;
  draft_posts: number;
  recent_signups: number;
  active_users: number;
};

function StatCard({
  title,
  value,
  subtitle,
  icon,
  color,
  trend,
}: {
  title: string;
  value: number | string;
  subtitle?: string;
  icon: React.ReactNode;
  color: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}) {
  return (
    <Card className="p-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp
                className={`w-3 h-3 mr-1 ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              />
              <span
                className={`text-xs font-medium ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}%
              </span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      </div>
    </Card>
  );
}

function LoadingCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map((i) => (
        <Card key={i} className="p-6">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded w-16 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-32"></div>
          </div>
        </Card>
      ))}
    </div>
  );
}

function ErrorState({ retry }: { retry: () => void }) {
  return (
    <Card className="p-8">
      <div className="text-center">
        <p className="text-red-600 mb-4">Failed to load admin statistics</p>
        <button
          onClick={retry}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    </Card>
  );
}

function StatsGrid({ stats }: { stats: AdminStatsData }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Users"
        value={stats.users}
        subtitle={`${stats.recent_signups} new this month`}
        icon={<Users className="w-6 h-6 text-blue-600" />}
        color="bg-blue-100"
        trend={{ value: 12, isPositive: true }}
      />

      <StatCard
        title="Total Posts"
        value={stats.posts}
        subtitle={`${stats.published_posts} published`}
        icon={<FileText className="w-6 h-6 text-green-600" />}
        color="bg-green-100"
      />

      <StatCard
        title="Draft Posts"
        value={stats.draft_posts}
        subtitle="Awaiting publication"
        icon={<FileText className="w-6 h-6 text-yellow-600" />}
        color="bg-yellow-100"
      />

      <StatCard
        title="Active Users"
        value={stats.active_users}
        subtitle="Last 7 days"
        icon={<Activity className="w-6 h-6 text-purple-600" />}
        color="bg-purple-100"
        trend={{ value: 8, isPositive: true }}
      />
    </div>
  );
}

export default function AdminStats() {
  const { data, error, mutate } = useSWR<AdminStatsData>(
    "/api/admin/stats",
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch stats");
      return res.json();
    }
  );

  if (error) {
    return <ErrorState retry={() => mutate()} />;
  }

  if (!data) {
    return <LoadingCards />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-900">
          Platform Statistics
        </h2>
        <button
          onClick={() => mutate()}
          className="text-sm text-blue-600 hover:text-blue-800 font-medium"
        >
          Refresh
        </button>
      </div>

      <StatsGrid stats={data} />
    </div>
  );
}
