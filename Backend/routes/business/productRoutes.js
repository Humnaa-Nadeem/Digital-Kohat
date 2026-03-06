import express from "express";
import * as productController from "../../Controller/business/productController.js";
import { businessAuth } from "../../Middleware/business/businessAuthMiddleware.js";
import { businessRole } from "../../Middleware/business/businessRoleMiddleware.js";

const router = express.Router();

router.get("/business/:businessId", productController.getBusinessProducts);
router.post("/add", businessAuth, businessRole, productController.addProduct);
router.put("/update/:productId", businessAuth, businessRole, productController.updateProduct);
router.delete("/delete/:productId", businessAuth, businessRole, productController.deleteProduct);

export default router;
