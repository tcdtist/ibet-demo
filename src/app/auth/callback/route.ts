import { createRouteHandlerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirectTo") ?? "/dashboard";

  if (code) {
    const supabase = createRouteHandlerClient(request);

    try {
      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        // eslint-disable-next-line no-console
        console.error("Auth callback error:", error);
        return NextResponse.redirect(
          `${origin}/login?error=auth_callback_error`
        );
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Auth callback exception:", error);
      return NextResponse.redirect(`${origin}/login?error=auth_callback_error`);
    }
  }

  // URL to redirect to after sign up process completes
  return NextResponse.redirect(`${origin}${redirectTo}`);
}
