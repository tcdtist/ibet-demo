import { Shield } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Admin Header */}
        <div className="py-6 border-b border-gray-200">
          <div className="flex items-center">
            <Shield className="w-8 h-8 mr-3 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin CMS</h1>
              <p className="text-gray-600">Content Management System</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="py-8">{children}</div>
      </div>
    </div>
  );
}
