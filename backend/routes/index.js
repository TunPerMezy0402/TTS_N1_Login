import express from "express";
import authRoutes from "./auth.routes.js";

const router = express.Router();

// Mount các route con
router.use("/auth", authRoutes);

export default router;
