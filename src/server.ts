import app from "./app";
import { connectDB } from "./config/db";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT || 5000, () => {
      console.log("Server is running on 5000");
    });
  } catch (error) {
    console.log("Server not connected", error);
  }
};

startServer();
