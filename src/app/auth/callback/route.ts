import { createRouteHandlerClient } from "@/lib/supabase-server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const origin = requestUrl.origin;
  const redirectTo = requestUrl.searchParams.get("redirectTo") ?? "/dashboard";

  // Handle OAuth error cases
  if (error) {
    console.error("OAuth error:", error, errorDescription);
    const errorMessage = errorDescription || error;
    return NextResponse.redirect(
      `${origin}/login?error=${encodeURIComponent(errorMessage)}`
    );
  }

  // Handle auth code exchange
  if (code) {
    const supabase = createRouteHandlerClient(request);

    try {
      const { data, error: exchangeError } =
        await supabase.auth.exchangeCodeForSession(code);

      if (exchangeError) {
        console.error("Auth callback error:", exchangeError);
        return NextResponse.redirect(
          `${origin}/login?error=${encodeURIComponent(exchangeError.message)}`
        );
      }

      // Check if user is new (first time login/signup)
      const isNewUser =
        data?.user &&
        data.user.email_confirmed_at &&
        !data.user.last_sign_in_at;

      // For new users, redirect to a welcome flow or show success message
      if (isNewUser) {
        return NextResponse.redirect(
          `${origin}/auth/welcome?redirectTo=${encodeURIComponent(redirectTo)}`
        );
      }

      // For returning users, redirect to the intended destination
      return NextResponse.redirect(`${origin}${redirectTo}`);
    } catch (error) {
      console.error("Auth callback exception:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Authentication failed";
      return NextResponse.redirect(
        `${origin}/login?error=${encodeURIComponent(errorMessage)}`
      );
    }
  }

  // No code provided, redirect to login
  console.warn("No auth code provided in callback");
  return NextResponse.redirect(`${origin}/login?error=missing_auth_code`);
}
