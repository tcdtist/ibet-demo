import type { User } from "@supabase/supabase-js";

export type UserRole = "admin" | "user";

export function getUserRole(user: User | null): UserRole {
  if (!user) return "user";
  return user.user_metadata?.role === "admin" ? "admin" : "user";
}

export function isAdmin(user: User | null): boolean {
  return getUserRole(user) === "admin";
}

export function hasAccess(user: User | null, requiredRole: UserRole): boolean {
  if (requiredRole === "user") return !!user;
  if (requiredRole === "admin") return isAdmin(user);
  return false;
}

export function redirectPath(userRole: UserRole): string {
  return userRole === "admin" ? "/admin/dashboard" : "/dashboard";
}
