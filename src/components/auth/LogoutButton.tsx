"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/auth/hooks";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

function ConfirmDialog({
  isOpen,
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-sm mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Confirm Logout
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          Are you sure you want to sign out?
        </p>
        <div className="flex gap-3">
          <Button onClick={onConfirm} variant="outline" className="flex-1">
            Yes, sign out
          </Button>
          <Button onClick={onCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
}

function LoadingButton({
  loading,
  children,
  onClick,
  variant = "outline",
  size = "default",
}: {
  loading: boolean;
  children: React.ReactNode;
  onClick: () => void;
  variant?: "outline" | "default" | "ghost";
  size?: "default" | "sm" | "lg";
}) {
  return (
    <Button onClick={onClick} variant={variant} size={size} disabled={loading}>
      {loading ? (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
          Signing out...
        </div>
      ) : (
        children
      )}
    </Button>
  );
}

export default function LogoutButton({
  variant = "outline",
  size = "default",
  showConfirmDialog = false,
  redirectTo = "/login",
  children,
}: {
  variant?: "outline" | "default" | "ghost";
  size?: "default" | "sm" | "lg";
  showConfirmDialog?: boolean;
  redirectTo?: string;
  children?: React.ReactNode;
}) {
  const [loading, setLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);

    try {
      const { error } = await logout();
      if (error) {
        console.error("Logout error:", error);
      }
      router.push(redirectTo);
    } catch (err) {
      console.error("Unexpected logout error:", err);
    } finally {
      setLoading(false);
      setShowDialog(false);
    }
  };

  const handleClick = () => {
    if (showConfirmDialog) {
      setShowDialog(true);
    } else {
      handleLogout();
    }
  };

  return (
    <>
      <LoadingButton
        loading={loading}
        onClick={handleClick}
        variant={variant}
        size={size}
      >
        {children || (
          <>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </>
        )}
      </LoadingButton>

      <ConfirmDialog
        isOpen={showDialog}
        onConfirm={handleLogout}
        onCancel={() => setShowDialog(false)}
      />
    </>
  );
}
