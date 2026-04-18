"use client";

import { Pencil, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { DataTable, type ColumnDef } from "@/components/admin/DataTable";
import { DeleteDialog } from "@/components/admin/DeleteDialog";
import { ColorSwatch } from "@/components/product/ColorSwatch";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

type ProductsTableProps = {
  products: Product[];
};

const priceFormatter = new Intl.NumberFormat("en-IE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function truncate(value: string, max: number): string {
  return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter();
  const [pending, setPending] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    if (!pending) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/products/${encodeURIComponent(pending._id)}`,
        { method: "DELETE" },
      );
      if (response.ok) {
        toast.success(`Deleted ${pending.name.en}`);
        setPending(null);
        router.refresh();
        return;
      }
      if (response.status === 401) {
        toast.error("Session expired. Please sign in again.");
        router.push("/admin/login");
        return;
      }
      toast.error("Failed to delete product");
    } catch {
      toast.error("Network error. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  }

  const columns: ColumnDef<Product>[] = [
    {
      key: "image",
      header: "Image",
      className: "w-[100px]",
      render: (product) => {
        const first = product.images[0];
        return (
          <div className="relative h-[60px] w-20 overflow-hidden rounded-md border border-border bg-accent/40">
            {first ? (
              <Image
                src={first}
                alt=""
                fill
                unoptimized
                sizes="80px"
                className="object-cover"
              />
            ) : null}
          </div>
        );
      },
    },
    {
      key: "name",
      header: "Name",
      render: (product) => (
        <div className="flex flex-col">
          <span className="font-medium text-foreground">
            {truncate(product.name.en, 40)}
          </span>
          <span className="text-xs text-muted-foreground">
            /{product.slug}
          </span>
        </div>
      ),
    },
    {
      key: "size",
      header: "Size",
      render: (product) => (
        <span className="text-sm text-foreground">{product.size}</span>
      ),
    },
    {
      key: "color",
      header: "Color",
      render: (product) => (
        <div className="flex items-center gap-2">
          <ColorSwatch
            hex={product.colorHex}
            label={product.color}
            size="sm"
          />
          <span className="text-sm capitalize text-foreground">
            {product.color}
          </span>
        </div>
      ),
    },
    {
      key: "price",
      header: "Price",
      render: (product) => (
        <span className="text-sm font-medium text-foreground">
          {priceFormatter.format(product.price)}
        </span>
      ),
    },
    {
      key: "featured",
      header: "Featured",
      className: "w-[100px]",
      render: (product) => (
        <span
          className={cn(
            "text-sm",
            product.featured ? "text-primary" : "text-muted-foreground",
          )}
          aria-label={product.featured ? "Featured" : "Not featured"}
        >
          {product.featured ? "✓" : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "w-[140px] text-right",
      render: (product) => (
        <div className="flex items-center justify-end gap-2">
          <Button asChild variant="ghost" size="icon-sm">
            <Link
              href={`/admin/products/${product._id}`}
              aria-label={`Edit ${product.name.en}`}
            >
              <Pencil aria-hidden="true" />
            </Link>
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            onClick={() => setPending(product)}
            aria-label={`Delete ${product.name.en}`}
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
        rows={products}
        emptyMessage="No products yet. Create your first one."
        getRowKey={(product) => product._id}
      />
      <DeleteDialog
        open={pending !== null}
        onOpenChange={(open) => {
          if (!open) setPending(null);
        }}
        onConfirm={handleDelete}
        itemLabel={pending ? `"${pending.name.en}"` : "this product"}
        isDeleting={isDeleting}
      />
    </>
  );
}
