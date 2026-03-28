import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserOrders, requestReturn, requestExchange } from "../controllers/order.controller.js";

const router = express.Router();

router.get("/user", protectRoute, getUserOrders);
router.post("/return", protectRoute, requestReturn);
router.post("/exchange", protectRoute, requestExchange);

export default router;
