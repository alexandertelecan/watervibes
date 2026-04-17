import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Toaster } from "@/components/ui/sonner";
import { requireAdmin } from "@/lib/auth-server";

// DESIGN.md §5 — Admin lighter pass
// Tokens inherit (warm cream). No grain overlay, no video, no gradients.
// Radii stay smaller (rounded-md except Dialogs, which the primitives
// already set). Shadows are sm only — admin is the working room, not
// the showroom.
export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-dvh bg-background">
      <AdminSidebar />
      <main className="flex-1 p-8 md:p-10">{children}</main>
      <Toaster position="bottom-right" richColors />
    </div>
  );
}
