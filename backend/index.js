import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes/index.js"; // route tổng hợp

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware toàn cục
app.use(cors());
app.use(express.json());

// Kết nối MongoDB
import { connectDB } from "./config/database.js";

connectDB();

// Routes
app.use("/api", routes); // tất cả route con nằm trong routes/index.js

// Route mặc định
app.get("/", (req, res) => {
  res.send("Hello Node.js + Express + MongoDB 🚀");
});

// Lắng nghe cổng
app.listen(PORT, () => {
  console.log(`Server chạy tại http://localhost:${PORT}`);
});
