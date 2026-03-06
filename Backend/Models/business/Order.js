import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    businessId: { type: mongoose.Schema.Types.ObjectId, ref: "Business", required: true },
    customerName: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerEmail: { type: String },
    items: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        productName: { type: String },
        quantity: { type: Number, default: 1 },
        price: { type: Number }
    }],
    totalAmount: { type: Number, required: true },
    status: {
        type: String,
        enum: ["New", "Pending", "Approved", "Rejected", "Received"],
        default: "New"
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Order", OrderSchema);
