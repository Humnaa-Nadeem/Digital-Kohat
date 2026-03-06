import Product from "../../Models/business/Product.js";
import cloudinary from "../../Config/cloudinary.js";
import { getPublicIdFromUrl } from "../../HelperFun/helperFun.js";

export const addProduct = async (req, res) => {
    try {
        const businessId = req.business.id;
        const { productImage, productName, shortDescription, price } = req.body;

        const product = new Product({
            businessId,
            productImage,
            productName,
            shortDescription,
            price
        });

        await product.save();
        res.json({ success: true, message: "Product added successfully", data: product });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const businessId = req.business.id;
        const updateData = req.body;

        const product = await Product.findOne({ _id: productId, businessId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (updateData.productImage && updateData.productImage !== product.productImage) {
            const publicId = getPublicIdFromUrl(product.productImage);
            if (publicId) await cloudinary.uploader.destroy(publicId);
        }

        const updatedProduct = await Product.findByIdAndUpdate(productId, { $set: updateData }, { new: true });
        res.json({ success: true, message: "Product updated successfully", data: updatedProduct });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const businessId = req.business.id;

        const product = await Product.findOne({ _id: productId, businessId });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        const publicId = getPublicIdFromUrl(product.productImage);
        if (publicId) await cloudinary.uploader.destroy(publicId);

        await Product.findByIdAndDelete(productId);
        res.json({ success: true, message: "Product deleted successfully" });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getBusinessProducts = async (req, res) => {
    try {
        const { businessId } = req.params;
        const products = await Product.find({ businessId });
        res.json({ success: true, data: products });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
