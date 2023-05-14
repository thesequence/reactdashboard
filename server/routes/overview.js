import express from "express";
import { getSales } from "../controllers/overview.js";

const router = express.Router();

router.get("/overview", getSales);

export default router;
