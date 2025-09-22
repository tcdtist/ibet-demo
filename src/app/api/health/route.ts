import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  try {
    // Test Supabase connection
    const { error } = await supabase
      .from("profiles")
      .select("count", { count: "exact", head: true });

    if (error && error.code !== "PGRST116") {
      throw error;
    }

    return NextResponse.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      services: {
        database: "connected",
        supabase: "connected",
      },
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Health check failed:", error);
    return NextResponse.json(
      {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
