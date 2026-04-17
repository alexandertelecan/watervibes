import mongoose, { Schema, type InferSchemaType, type Model } from "mongoose";

import { PRODUCT_SIZES } from "@/types/product";

const BilingualSchema = new Schema(
  {
    en: { type: String, required: true, trim: true },
    ro: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const BilingualListSchema = new Schema(
  {
    en: { type: [String], default: [] },
    ro: { type: [String], default: [] },
  },
  { _id: false },
);

const SpecsSchema = new Schema(
  {
    dimensions: { type: String, required: true },
    jets: { type: Number, required: true, min: 0 },
    capacity: { type: Number, required: true, min: 1 },
    power: { type: String, required: true },
    weightEmpty: { type: String, required: true },
    weightFull: { type: String, required: true },
  },
  { _id: false },
);

const ProductSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    name: { type: BilingualSchema, required: true },
    tagline: { type: BilingualSchema, required: true },
    description: { type: BilingualSchema, required: true },
    size: {
      type: String,
      required: true,
      enum: PRODUCT_SIZES,
      index: true,
    },
    color: { type: String, required: true, lowercase: true, trim: true, index: true },
    colorHex: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    specs: { type: SpecsSchema, required: true },
    features: { type: BilingualListSchema, default: () => ({ en: [], ro: [] }) },
    featured: { type: Boolean, default: false, index: true },
    order: { type: Number, default: 0, index: true },
  },
  { timestamps: true },
);

export type ProductDoc = InferSchemaType<typeof ProductSchema>;

export const ProductModel: Model<ProductDoc> =
  (mongoose.models.Product as Model<ProductDoc>) ??
  mongoose.model<ProductDoc>("Product", ProductSchema);
