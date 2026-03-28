import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";

import { connectDB } from "./lib/db.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// Always load backend/.env regardless of where node is started from.
dotenv.config({ path: path.join(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5001;

// CORS configuration
app.use(cors({
	origin: process.env.NODE_ENV === "production" 
		? process.env.CLIENT_URL || true // Allow your deployed frontend URL
		: ["http://localhost:5173", "http://localhost:5174"], // Common local frontend URLs
	credentials: true, // Allow cookies
}));

app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/orders", (await import("./routes/order.route.js")).default);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error('Server Error:', err);
	res.status(500).json({ 
		message: 'Internal Server Error',
		error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
	});
});

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(ROOT_DIR, "frontend", "dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(ROOT_DIR, "frontend", "dist", "index.html"));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode`);
	console.log(`MongoDB URI: ${process.env.MONGO_URI ? 'Set' : 'Not Set'}`);
	console.log(`Redis URL: ${process.env.UPSTASH_REDIS_URL ? 'Set' : 'Not Set'}`);
	connectDB();
}).on('error', (err) => {
	console.error('Server failed to start:', err);
});
