import { ObjectId } from "mongodb";
import { getCollections } from "../HelperFun/helperFun.js";

export const PlaceOrder = async (req, res) => {
    try {
        const { ORDERS } = getCollections(req);
        const orderData = req.body;

        if (!orderData.serviceId) {
            return res.json({ success: false, message: "Service ID is required." });
        }

        const newOrder = {
            ...orderData,
            serviceId: new ObjectId(orderData.serviceId),
            createdAt: new Date(),
            status: "Pending"
        };

        const result = await ORDERS.insertOne(newOrder);
        res.json({ success: true, message: "Order placed successfully!", orderId: result.insertedId });
    } catch (error) {
        console.error("PlaceOrder error:", error);
        res.json({ success: false, message: "Failed to place order." });
    }
};

export const GetOrdersByService = async (req, res) => {
    try {
        const { ORDERS } = getCollections(req);
        const { serviceId } = req.body;

        if (!serviceId) {
            return res.json({ success: false, message: "Service ID is required." });
        }

        const orders = await ORDERS.find({ serviceId: new ObjectId(serviceId) }).sort({ createdAt: -1 }).toArray();
        res.json({ success: true, orders });
    } catch (error) {
        console.error("GetOrdersByService error:", error);
        res.json({ success: false, message: "Failed to fetch orders." });
    }
};

export const UpdateOrderStatus = async (req, res) => {
    try {
        const { ORDERS } = getCollections(req);
        const { orderId, status } = req.body;

        await ORDERS.updateOne(
            { _id: new ObjectId(orderId) },
            { $set: { status } }
        );

        res.json({ success: true, message: "Order status updated." });
    } catch (error) {
        console.error("UpdateOrderStatus error:", error);
        res.json({ success: false, message: "Failed to update order status." });
    }
};

export const BookTable = async (req, res) => {
    try {
        const db = req.app.locals.db;
        const reservations = db.collection(process.env.RESERVATIONS_C || "Reservations");
        const bookingData = req.body;

        if (!bookingData.serviceId) {
            return res.json({ success: false, message: "Service ID is required." });
        }

        const newBooking = {
            ...bookingData,
            serviceId: new ObjectId(bookingData.serviceId),
            createdAt: new Date(),
            status: "Confirmed"
        };

        const result = await reservations.insertOne(newBooking);
        res.json({ success: true, message: "Table booked successfully!", bookingId: result.insertedId });
    } catch (error) {
        console.error("BookTable error:", error);
        res.json({ success: false, message: "Failed to book table." });
    }
};
