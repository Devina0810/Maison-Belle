import Order from "../models/order.model.js";
import { protectRoute } from "../middleware/auth.middleware.js";

// Get all orders for the logged-in user
export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).populate("products.product");
        res.json({ orders });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Request return for an order
export const requestReturn = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const order = await Order.findOne({ _id: orderId, user: req.user._id });
        if (!order) return res.status(404).json({ message: "Order not found" });
        order.status = "requested_return";
        order.returnReason = reason || "";
        await order.save();
        res.json({ message: "Return requested", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// Request exchange for an order
export const requestExchange = async (req, res) => {
    try {
        const { orderId, reason } = req.body;
        const order = await Order.findOne({ _id: orderId, user: req.user._id });
        if (!order) return res.status(404).json({ message: "Order not found" });
        order.status = "requested_exchange";
        order.exchangeReason = reason || "";
        await order.save();
        res.json({ message: "Exchange requested", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
