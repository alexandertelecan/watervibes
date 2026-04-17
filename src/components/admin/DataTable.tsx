"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export type ColumnDef<T> = {
  key: keyof T | string;
  header: string;
  render?: (row: T) => ReactNode;
  className?: string;
};

type DataTableProps<T> = {
  columns: ColumnDef<T>[];
  rows: T[];
  emptyMessage: string;
  getRowKey: (row: T) => string;
};

// DESIGN.md §5 (Admin) — DataTable
// Rounded-md corners per admin radius override; borders use --border,
// row hover uses --surface/50 so the warm palette propagates without
// shouting. thead gets a subtle bg-surface wash + eyebrow-style header
// type for calm visual hierarchy.
// TODO: add sorting + pagination when we outgrow small datasets.
export function DataTable<T>({
  columns,
  rows,
  emptyMessage,
  getRowKey,
}: DataTableProps<T>) {
  if (rows.length === 0) {
    return (
      <div className="rounded-md border border-border bg-background px-6 py-16 text-center text-small text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background shadow-sm">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-border bg-surface/60 text-eyebrow text-muted-foreground">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                scope="col"
                className={cn("px-4 py-3 font-semibold", col.className)}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {rows.map((row) => (
            <tr
              key={getRowKey(row)}
              className="transition-colors hover:bg-surface/50"
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={cn("px-4 py-3 align-middle", col.className)}
                >
                  {col.render
                    ? col.render(row)
                    : String((row as Record<string, unknown>)[col.key as string] ?? "")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
