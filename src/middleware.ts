import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name: string) {
        return request.cookies.get(name)?.value;
      },
      set(name: string, value: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value,
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value,
          ...options,
        });
      },
      remove(name: string, options: CookieOptions) {
        request.cookies.set({
          name,
          value: "",
          ...options,
        });
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        response.cookies.set({
          name,
          value: "",
          ...options,
        });
      },
    },
  });

  // Get user session
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  // Get pathname and search params
  const { pathname, searchParams } = request.nextUrl;

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/admin"];
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Auth routes that should redirect if user is already logged in
  const authRoutes = ["/login", "/signup"];
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Handle protected routes
  if (isProtectedRoute && (!user || error)) {
    // Save the attempted URL for redirect after login
    const redirectUrl = new URL("/login", request.url);
    redirectUrl.searchParams.set("redirectTo", request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Handle auth routes when user is already logged in
  if (isAuthRoute && user && !error) {
    // Check for redirect parameter
    const redirectTo = searchParams.get("redirectTo");
    if (redirectTo) {
      try {
        const redirectUrl = new URL(redirectTo);
        // Only allow same-origin redirects for security
        if (redirectUrl.origin === request.nextUrl.origin) {
          return NextResponse.redirect(redirectUrl);
        }
      } catch (e) {
        // Invalid URL, fallback to dashboard
      }
    }
    // Default redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Handle admin routes - check for admin role
  if (pathname.startsWith("/admin") && user) {
    // You can implement role-based access here
    // For now, we'll allow any authenticated user to access admin
    // In production, you should check user metadata or role from database
    // Example: Check if user has admin role
    // const { data: profile } = await supabase
    //   .from('profiles')
    //   .select('role')
    //   .eq('id', user.id)
    //   .single();
    //
    // if (profile?.role !== 'admin') {
    //   return NextResponse.redirect(new URL('/dashboard', request.url));
    // }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     * - api routes that don't need protection
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|api/health).*)",
  ],
};
