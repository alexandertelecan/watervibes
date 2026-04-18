"use client";

import { Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { DataTable, type ColumnDef } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/types/testimonial";

type TestimonialsTableProps = {
  testimonials: Testimonial[];
};

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function TestimonialsTable({ testimonials }: TestimonialsTableProps) {
  const router = useRouter();
  const [pending, setPending] = useState<Testimonial | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!pending) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/testimonials/${encodeURIComponent(pending._id)}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        toast.success(`Deleted testimonial by ${pending.author}`);
        setPending(null);
        router.refresh();
        return;
      }
      if (response.status === 401) {
        toast.error("Session expired. Please sign in again.");
        router.push("/admin/login");
        return;
      }
      toast.error("Failed to delete testimonial");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: ColumnDef<Testimonial>[] = [
    {
      key: "author",
      header: "Author",
      render: (t) => (
        <span className="font-medium text-foreground">{t.author}</span>
      ),
    },
    {
      key: "location",
      header: "Location",
      render: (t) => (
        <span className="text-sm text-muted-foreground">{t.location}</span>
      ),
    },
    {
      key: "quote",
      header: "Quote",
      render: (t) => (
        <span className="text-sm text-foreground/85">
          “{truncate(t.quote.en, 60)}”
        </span>
      ),
    },
    {
      key: "rating",
      header: "Rating",
      className: "w-[120px]",
      render: (t) => (
        <span
          aria-label={`${t.rating} out of 5 stars`}
          className="text-amber-500"
        >
          {"★".repeat(t.rating)}
          <span className="text-muted-foreground">
            {"★".repeat(5 - t.rating)}
          </span>
        </span>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      className: "w-[100px]",
      render: (t) => (
        <span
          className={cn(
            "text-sm",
            t.featured ? "text-primary" : "text-muted-foreground",
          )}
        >
          {t.featured ? "✓" : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[140px] text-right",
      render: (t) => (
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost" size="icon-sm">
            <Link
              href={`/admin/testimonials/${t._id}`}
              aria-label={`Edit testimonial by ${t.author}`}
            >
              <Pencil aria-hidden="true" />
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setPending(t)}
            aria-label={`Delete testimonial by ${t.author}`}
          >
            <Trash2 aria-hidden="true" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DataTable
        columns={columns}
        rows={testimonials}
        emptyMessage="No testimonials yet. Create your first one."
        getRowKey={(t) => t._id}
      />
      <DeleteDialog
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        onConfirm={handleDelete}
        itemLabel={pending ? `the testimonial by "${pending.author}"` : "this testimonial"}
        isDeleting={isDeleting}
      />
    </>
  );
}
