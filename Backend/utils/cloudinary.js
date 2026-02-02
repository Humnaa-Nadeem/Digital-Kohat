import cloudinary from "../Config/cloudinary.js";
import { getPublicIdFromUrl } from "../HelperFun/helperFun.js";

// Function that help to upload the images to cloudinary
export const uploadToCloudinary = (fileOrBuffer, folder) => {
    return new Promise((resolve, reject) => {
        // Convert ArrayBuffer to Node.js Buffer if needed
        let bufferToUpload;
        if (fileOrBuffer.buffer) {
            // Multer File object
            bufferToUpload = Buffer.from(fileOrBuffer.buffer);
        } else if (fileOrBuffer instanceof ArrayBuffer) {
            // Direct ArrayBuffer
            bufferToUpload = Buffer.from(fileOrBuffer);
        } else if (Buffer.isBuffer(fileOrBuffer)) {
            bufferToUpload = fileOrBuffer;
        } else {
            return reject(new Error("Invalid file/buffer type for Cloudinary upload"));
        }

        cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image",
            },
            (error, result) => {
                if (error) return reject(error);
                resolve(result);
            }
        ).end(bufferToUpload);
    });
};

// Function that help to Delete the Images from Cloudinary
export const DeleteStaffImage = async (req, res) => {
    try {
        const { imageUrl } = req.body;
        if (!imageUrl) return res.status(400).json({ success: false, message: "No image URL provided" });

        const public_id = getPublicIdFromUrl(imageUrl);

        // Delete from Cloudinary
        const result = await cloudinary.uploader.destroy(public_id, { resource_type: "image" });

        if (result.result !== "ok" && result.result !== "not found") {
            return res.status(500).json({ success: false, message: "Failed to delete image from Cloudinary" });
        }

        res.status(200).json({ success: true, message: "Image deleted from Cloudinary" });
    } catch (error) {
        console.error("DeleteStaffImage error:", error);
        res.status(500).json({ success: false, message: "Failed to delete image" });
    }
};


export const deleteFromCloudinary = async (publicId) => {
    if (!publicId) return;

    try {
        const res = await cloudinary.uploader.destroy(publicId);
        return res;
    } catch (error) {
        console.error("Cloudinary delete failed:", error);
        throw error;
    }
};

