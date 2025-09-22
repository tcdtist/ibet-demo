import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase-server";

type ActivityItem = {
  id: string;
  action: string;
  description?: string;
  created_at: string;
  type: "login" | "post_created" | "post_updated" | "profile_updated";
};

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const activities: ActivityItem[] = [
      {
        id: "1",
        action: "Signed in to dashboard",
        description: "Authenticated via email",
        created_at: new Date().toISOString(),
        type: "login",
      },
      {
        id: "2",
        action: "Viewed admin panel",
        description: "Accessed CMS interface",
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        type: "profile_updated",
      },
      {
        id: "3",
        action: "Profile updated",
        description: "Updated account settings",
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        type: "profile_updated",
      },
      {
        id: "4",
        action: "Dashboard accessed",
        description: "Viewed user statistics",
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        type: "login",
      },
      {
        id: "5",
        action: "System login",
        description: "Initial authentication",
        created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        type: "login",
      },
    ];

    try {
      const { data: posts } = await (supabase as any)
        .from("posts")
        .select("id, title, created_at, updated_at")
        .eq("author_id", userId)
        .order("created_at", { ascending: false })
        .limit(5);

      if (posts && posts.length > 0) {
        const postActivities = posts.map((post: any, index: number) => ({
          id: `post-${post.id}`,
          action: `Created post: ${post.title}`,
          description: "Published new content",
          created_at: post.created_at,
          type: "post_created" as const,
        }));

        activities.splice(1, 0, ...postActivities);
      }
    } catch (error) {
      console.warn("Could not fetch post activities:", error);
    }

    const sortedActivities = activities
      .sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      .slice(0, 10);

    return NextResponse.json(sortedActivities);
  } catch (error) {
    console.error("Error fetching activity:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
