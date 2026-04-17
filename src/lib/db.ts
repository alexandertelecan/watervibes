import mongoose from "mongoose";

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

declare global {
  var __mongooseCache: MongooseCache | undefined;
}

const cached: MongooseCache =
  globalThis.__mongooseCache ??
  (globalThis.__mongooseCache = { conn: null, promise: null });

export async function dbConnect(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is not set");
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri, {
      dbName: process.env.MONGODB_DB,
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
