import type { Product } from "@/types/product";
import type { Testimonial, TestimonialRating } from "@/types/testimonial";

type UnknownRecord = Record<string, unknown>;

function toIsoString(value: unknown): string {
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "string") return value;
  return "";
}

export function serializeProduct(doc: UnknownRecord): Product {
  return {
    _id: String(doc._id),
    slug: String(doc.slug ?? ""),
    name: String(doc.name ?? ""),
    tagline: String(doc.tagline ?? ""),
    description: String(doc.description ?? ""),
    size: doc.size as Product["size"],
    color: doc.color as Product["color"],
    colorHex: String(doc.colorHex ?? ""),
    price: Number(doc.price ?? 0),
    images: Array.isArray(doc.images) ? (doc.images as string[]) : [],
    specs: doc.specs as Product["specs"],
    features: Array.isArray(doc.features) ? (doc.features as string[]) : [],
    featured: Boolean(doc.featured),
    order: Number(doc.order ?? 0),
    createdAt: toIsoString(doc.createdAt),
    updatedAt: toIsoString(doc.updatedAt),
  };
}

export function serializeTestimonial(doc: UnknownRecord): Testimonial {
  return {
    _id: String(doc._id),
    author: String(doc.author ?? ""),
    location: String(doc.location ?? ""),
    quote: String(doc.quote ?? ""),
    rating: Number(doc.rating ?? 5) as TestimonialRating,
    featured: Boolean(doc.featured),
    createdAt: toIsoString(doc.createdAt),
  };
}
