"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createClientComponentClient } from "@/lib/supabase";
import { User, AuthError, Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  loginWithGoogle: () => Promise<{ error: AuthError | null }>;
  signup: (
    email: string,
    password: string
  ) => Promise<{ error: AuthError | null }>;
  logout: () => Promise<{ error: AuthError | null }>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  login: async () => ({ error: null }),
  loginWithGoogle: async () => ({ error: null }),
  signup: async () => ({ error: null }),
  logout: async () => ({ error: null }),
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a SupabaseProvider");
  }
  return context;
};

interface SupabaseProviderProps {
  children: React.ReactNode;
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    };

    getInitialSession();

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);

      // Handle auth events
      if (event === "SIGNED_IN") {
        // Refresh the page to update server-side session
        router.refresh();
      } else if (event === "SIGNED_OUT") {
        router.refresh();
      }
    });

    return () => subscription.unsubscribe();
  }, [router, supabase.auth]);

  // Login with email and password
  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { error };
  };

  // Login with Google
  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  // Sign up with email and password
  const signup = async (email: string, password: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    return { error };
  };

  // Logout
  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.push("/");
    }
    return { error };
  };

  const value = {
    user,
    session,
    loading,
    login,
    loginWithGoogle,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Convenience hooks
export const useUser = () => {
  const { user } = useAuth();
  return user;
};

export const useSession = () => {
  const { session } = useAuth();
  return session;
};

export const useLogin = () => {
  const { login, loginWithGoogle } = useAuth();
  return { login, loginWithGoogle };
};

export const useLogout = () => {
  const { logout } = useAuth();
  return logout;
};
