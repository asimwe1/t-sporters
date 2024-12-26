import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const mongo_url = process.env.db_url;

export const connectToDatabase = () => {
  try { mongoose.connect(mongo_url).then(() => console.log('Connected to MongoDB'));
  } catch (error) {
    console.error(error.message);
  }
}