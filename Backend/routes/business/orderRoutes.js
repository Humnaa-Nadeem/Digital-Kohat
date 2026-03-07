import express from "express";
import * as orderController from "../../Controller/business/orderController.js";
import { businessAuth } from "../../Middleware/business/businessAuthMiddleware.js";
import { businessRole } from "../../Middleware/business/businessRoleMiddleware.js";


const router = express.Router();

router.get("/get-orders", businessAuth, businessRole, orderController.getBusinessOrders);

router.put("/update-status/:orderId", businessAuth, businessRole, orderController.updateOrderStatus);
router.post("/place", orderController.placeBusinessOrder); // Public route for customers

export default router;
