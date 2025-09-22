"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { login, loginWithGoogle } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Chrome, Eye, EyeOff } from "lucide-react";

function EmailInput({
  value,
  onChange,
  disabled,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
}) {
  return (
    <div>
      <label
        htmlFor="email"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Email
      </label>
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
        />
      </div>
    </div>
  );
}

function PasswordInput({
  value,
  onChange,
  disabled,
  showPassword,
  onToggleVisibility,
}: {
  value: string;
  onChange: (value: string) => void;
  disabled: boolean;
  showPassword: boolean;
  onToggleVisibility: () => void;
}) {
  return (
    <div>
      <label
        htmlFor="password"
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        Password
      </label>
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          id="password"
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          required
        />
        <button
          type="button"
          onClick={onToggleVisibility}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
        >
          {showPassword ? (
            <EyeOff className="w-4 h-4" />
          ) : (
            <Eye className="w-4 h-4" />
          )}
        </button>
      </div>
    </div>
  );
}

function ErrorMessage({ error }: { error: string | null }) {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
      {error}
    </div>
  );
}

function LoadingButton({
  loading,
  children,
  loadingText,
}: {
  loading: boolean;
  children: React.ReactNode;
  loadingText: string;
}) {
  return (
    <Button type="submit" className="w-full" disabled={loading}>
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
          {loadingText}
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

function GoogleLoginButton({
  onClick,
  disabled,
}: {
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full"
        onClick={onClick}
        disabled={disabled}
      >
        <Chrome className="w-4 h-4 mr-2" />
        Continue with Google
      </Button>
    </>
  );
}

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      const { error } = await login(email, password);
      if (error) {
        setError(error.message);
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError(null);

    try {
      const { error } = await loginWithGoogle();
      if (error) {
        // Handle specific OAuth provider error
        if (
          error.message.includes("provider is not enabled") ||
          error.message.includes("Unsupported provider")
        ) {
          setError(
            "Google login is currently not available. Please use email and password to sign in."
          );
        } else {
          setError(error.message);
        }
        setLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred");
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-6">
      <ErrorMessage error={error} />

      <form onSubmit={handleEmailLogin} className="space-y-4">
        <EmailInput value={email} onChange={setEmail} disabled={loading} />

        <PasswordInput
          value={password}
          onChange={setPassword}
          disabled={loading}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
        />

        <LoadingButton loading={loading} loadingText="Signing In...">
          Sign In
        </LoadingButton>
      </form>

      <GoogleLoginButton onClick={handleGoogleLogin} disabled={loading} />

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
}
