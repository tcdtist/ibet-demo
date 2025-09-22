"use client";

import useSWR from "swr";
import { Card } from "@/components/ui/card";
import { Activity, Clock, User } from "lucide-react";

type ActivityItem = {
  id: string;
  action: string;
  description?: string;
  created_at: string;
  type: "login" | "post_created" | "post_updated" | "profile_updated";
};

function ActivityIcon({ type }: { type: ActivityItem["type"] }) {
  const iconClass = "w-4 h-4";

  switch (type) {
    case "login":
      return <User className={`${iconClass} text-blue-600`} />;
    case "post_created":
      return <Activity className={`${iconClass} text-green-600`} />;
    case "post_updated":
      return <Activity className={`${iconClass} text-yellow-600`} />;
    default:
      return <Activity className={`${iconClass} text-gray-600`} />;
  }
}

function ActivityItemComponent({ activity }: { activity: ActivityItem }) {
  const timeAgo = new Date(activity.created_at).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-md transition-colors">
      <div className="flex-shrink-0 mt-0.5">
        <ActivityIcon type={activity.type} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">{activity.action}</p>
        {activity.description && (
          <p className="text-xs text-gray-500 mt-1">{activity.description}</p>
        )}
      </div>
      <div className="flex items-center text-xs text-gray-400">
        <Clock className="w-3 h-3 mr-1" />
        {timeAgo}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-12">
      <Activity className="w-12 h-12 text-gray-300 mx-auto mb-4" />
      <p className="text-gray-500">No recent activity</p>
      <p className="text-sm text-gray-400">Your activities will appear here</p>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse flex items-center space-x-3 p-3">
          <div className="w-4 h-4 bg-gray-200 rounded"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      ))}
    </div>
  );
}

function ErrorState({ retry }: { retry: () => void }) {
  return (
    <div className="text-center py-8">
      <p className="text-red-600 mb-2">Failed to load activity</p>
      <button
        onClick={retry}
        className="text-sm text-blue-600 hover:text-blue-800"
      >
        Try again
      </button>
    </div>
  );
}

export default function UserActivity() {
  const { data, error, mutate } = useSWR<ActivityItem[]>(
    "/api/activity",
    async (url: string) => {
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch activity");
      return res.json();
    }
  );

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="max-h-96 overflow-y-auto">
        {error ? (
          <ErrorState retry={() => mutate()} />
        ) : !data ? (
          <LoadingState />
        ) : data.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-1">
            {data.map((activity) => (
              <ActivityItemComponent key={activity.id} activity={activity} />
            ))}
          </div>
        )}
      </div>
    </Card>
  );
}
