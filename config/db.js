import mongose from "mongoose";
import { SECRETS } from "./secrets.js";
export const connectDB = async () => {
  try {
    const conn = await mongose.connect(SECRETS.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
}