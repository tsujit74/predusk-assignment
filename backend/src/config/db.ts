import mongoose from "mongoose";

export default async function connectDB() {
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI not set");
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB connected");
}
