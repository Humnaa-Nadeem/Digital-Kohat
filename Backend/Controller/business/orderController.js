import Order from "../../Models/business/Order.js";

export const getBusinessOrders = async (req, res) => {
    try {
        const businessId = req.business.id;
        const orders = await Order.find({ businessId }).sort({ createdAt: -1 });
        res.json({ success: true, data: orders });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const updateOrderStatus = async (req, res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const businessId = req.business.id;

        const order = await Order.findOne({ _id: orderId, businessId });
        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        order.status = status;
        await order.save();
        res.json({ success: true, message: "Order status updated successfully", data: order });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const placeBusinessOrder = async (req, res) => {
    try {
        const orderData = req.body; // Expect businessId, customer info, items, totalAmount
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.json({ success: true, message: "Order placed successfully", data: newOrder });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
