import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		products: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: {
					type: Number,
					required: true,
					min: 1,
				},
				price: {
					type: Number,
					required: true,
					min: 0,
				},
			},
		],
		totalAmount: {
			type: Number,
			required: true,
			min: 0,
		},
		razorpayOrderId: {
			type: String,
			unique: true,
		},
		razorpayPaymentId: {
			type: String,
			unique: true,
		},
		status: {
			type: String,
			enum: ["placed", "delivered", "requested_return", "requested_exchange", "returned", "exchanged"],
			default: "placed",
		},
		returnReason: {
			type: String,
			default: "",
		},
		exchangeReason: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
