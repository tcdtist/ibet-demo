"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { signup, loginWithGoogle } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/button";
import { Mail, Lock, Chrome, Eye, EyeOff, User } from "lucide-react";

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
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
  const isWeak = value.length > 0 && value.length < 6;

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
          className={`w-full pl-10 pr-10 py-2 border rounded-md focus:ring-2 ${
            isWeak
              ? "border-red-300 focus:ring-red-500 focus:border-red-500"
              : "border-gray-300 focus:ring-green-500 focus:border-green-500"
          }`}
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
      {isWeak && (
        <p className="mt-1 text-xs text-red-600">
          Password must be at least 6 characters
        </p>
      )}
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

function SuccessMessage({ message }: { message: string | null }) {
  if (!message) return null;

  return (
    <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm">
      {message}
    </div>
  );
}

function LoadingButton({
  loading,
  children,
  loadingText,
  disabled,
}: {
  loading: boolean;
  children: React.ReactNode;
  loadingText: string;
  disabled?: boolean;
}) {
  return (
    <Button
      type="submit"
      className="w-full bg-green-600 hover:bg-green-700"
      disabled={loading || disabled}
    >
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

function GoogleSignupButton({
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

export default function SignupForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isValidPassword = password.length >= 6;

  const handleEmailSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!isValidPassword) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const { error, data } = await signup(email, password);
      if (error) {
        setError(error.message);
      } else {
        if (data?.user && !data.user.email_confirmed_at) {
          setSuccess("Check your email for a verification link!");
        } else {
          setSuccess("Account created successfully!");
          setTimeout(() => router.push("/dashboard"), 2000);
        }
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
            "Google signup is currently not available. Please use email and password to create an account."
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
      <SuccessMessage message={success} />

      <form onSubmit={handleEmailSignup} className="space-y-4">
        <EmailInput value={email} onChange={setEmail} disabled={loading} />

        <PasswordInput
          value={password}
          onChange={setPassword}
          disabled={loading}
          showPassword={showPassword}
          onToggleVisibility={() => setShowPassword(!showPassword)}
        />

        <LoadingButton
          loading={loading}
          loadingText="Creating Account..."
          disabled={!isValidPassword}
        >
          Sign Up
        </LoadingButton>
      </form>

      <GoogleSignupButton onClick={handleGoogleSignup} disabled={loading} />

      <div className="text-center">
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-sm text-blue-600 hover:text-blue-500"
        >
          Already have an account? Sign in
        </button>
      </div>
    </div>
  );
}
