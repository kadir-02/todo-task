import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    const db = process.env.MONGO_URI;
    if (!db) {
      throw new Error("Database URI not present");
    }
    await mongoose.connect(db);
    console.log("Database connected");
  } catch (error) {
    console.log("Database not connected", error);
  }
};
