import SignupForm from "@/components/auth/SignupForm";
import OAuthProviderCheck from "@/components/auth/OAuthProviderCheck";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md">
        <Card className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
            <p className="text-gray-600 mt-2">
              Sign up to get started with your account
            </p>
          </div>

          <OAuthProviderCheck>
            <SignupForm />
          </OAuthProviderCheck>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back to home
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
