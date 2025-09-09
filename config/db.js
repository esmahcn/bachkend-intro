import mongoose from "mongoose";
import { SECRETS } from "./secrets.js";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(SECRETS.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};