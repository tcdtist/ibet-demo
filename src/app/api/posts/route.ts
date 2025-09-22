import { NextResponse, NextRequest } from "next/server";
import { createRouteHandlerClient } from "@/lib/supabase-server";
import type { CreatePostData } from "@/lib/types";

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data, error } = await (supabase as any)
      .from("posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching posts:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient(request);

    // Check authentication
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as CreatePostData;

    // Generate slug from title if not provided
    let slug = body.slug;
    if (!slug && body.title) {
      slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const postData: CreatePostData = {
      title: body.title,
      content: body.content || null,
      slug: slug || null,
      published: body.published || false,
      image_url: body.image_url || null,
      author_id: session.user.id,
    };

    const { data, error } = await (supabase as any)
      .from("posts")
      .insert(postData)
      .select()
      .single();

    if (error) {
      console.error("Error creating post:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
