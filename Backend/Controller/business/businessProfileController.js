import BusinessProfile from "../../Models/business/BusinessProfile.js";
import Product from "../../Models/business/Product.js";
import cloudinary from "../../Config/cloudinary.js";
import { getPublicIdFromUrl } from "../../HelperFun/helperFun.js";


export const getMyBusinessProfile = async (req, res) => {
    try {
        const businessId = req.business.id;
        const profile = await BusinessProfile.findOne({ businessId });
        if (!profile) {
            return res.status(200).json({ success: true, profile: null }); // Return success with null so frontend can show empty form
        }
        res.json({ success: true, profile });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getBusinessProfile = async (req, res) => {
    try {
        const { businessId } = req.params;
        const profile = await BusinessProfile.findOne({ businessId });
        if (!profile) {
            return res.status(404).json({ success: false, message: "Profile not found" });
        }

        const products = await Product.find({ businessId });
        const profileObj = profile.toObject();
        profileObj.products = products.map(p => ({
            id: p._id,
            title: p.productName,
            description: p.shortDescription,
            price: p.price,
            image: p.productImage
        }));

        res.json({ success: true, data: profileObj });


    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const updateBusinessProfile = async (req, res) => {
    try {
        const businessId = req.business.id;
        const profileData = req.body;

        let profile = await BusinessProfile.findOne({ businessId });

        if (profile) {
            // Update existing profile
            profile = await BusinessProfile.findOneAndUpdate(
                { businessId },
                { $set: profileData },
                { new: true }
            );
        } else {
            // Create new profile
            profile = new BusinessProfile({
                businessId,
                ...profileData
            });
            await profile.save();
        }

        res.json({ success: true, message: "Profile updated successfully", profile });
    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};

export const getProfilesByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const profiles = await BusinessProfile.find({ category });

        // Fetch products for each profile
        const profilesWithProducts = await Promise.all(profiles.map(async (profile) => {
            const products = await Product.find({ businessId: profile.businessId });
            const pObj = profile.toObject();
            pObj.products = products.map(p => ({
                id: p._id,
                title: p.productName,
                description: p.shortDescription,
                price: p.price,
                image: p.productImage
            }));

            return pObj;
        }));

        res.json({ success: true, profiles: profilesWithProducts });

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error", error: err.message });
    }
};
