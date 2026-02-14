import { ObjectId } from "mongodb";
import argon2 from "argon2";
import { getCollections, getPublicIdFromUrl } from "../HelperFun/helperFun.js";
import cloudinary from "../Config/cloudinary.js";

/* =========================================================
   CREATE FOOD ADMIN
========================================================= */

export const CreateFoodCataAdmin = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {

            const {
                AdminName,
                AdminEmail,
                AdminIDCard,
                ServiceName,
                ServiceLocation,
                ServiceType, // Assuming "RESTAURANT" or similar
                PaymentPlan,
                reqId
            } = req.body;

            if (!AdminName || !AdminEmail || !ServiceName || !ServiceType || !PaymentPlan) {
                return res.json({ success: false, message: "All fields required" });
            }

            const { ADMINS, NRs, FOODS } = getCollections(req);

            // Check if admin exists
            let admin = await ADMINS.findOne({
                AdminEmail,
                IDCard: AdminIDCard,
                AdminName
            });

            // Insert into FOODS collection
            const serviceResult = await FOODS.insertOne({
                ServiceName,
                Type: ServiceType,
                Status: true,
                PaymentPlan,
                createdAt: new Date()
            });

            const serviceObj = {
                ServiceId: serviceResult.insertedId,
                ServiceName,
                ServiceType,
                PaymentPlan
            };

            if (admin) {
                const exists = admin.Services?.some(
                    s =>
                        s.ServiceName === ServiceName &&
                        s.ServiceType === ServiceType
                );

                if (exists) {
                    return res.json({ success: false, message: "Service already exists" });
                }

                await ADMINS.updateOne(
                    { _id: admin._id },
                    {
                        $push: { Services: serviceObj }
                    }
                );

                return res.json({ success: true, message: "Service added to admin" });
            }

            // Fetch request data from NRs if reqId is provided
            let reqData = null;
            if (reqId) {
                reqData = await NRs.findOne({
                    _id: new ObjectId(reqId),
                    email: AdminEmail
                    // We can match more fields if needed
                });
            }

            // Create new Admin object
            const adminObj = {
                AdminName,
                AdminEmail,
                location: ServiceLocation,
                whatsappnumber: reqData?.whatsappnumber || "",
                phonenumber: reqData?.phonenumber || "",
                IDCard: AdminIDCard,
                Status: reqData?.Status || true,
                AdminPassword: reqData?.password || await argon2.hash("123456"), // Default or from req
                Role: "ADMIN",
                Verified: true,
                Services: [serviceObj],
                Managers: [],
                createdAt: new Date()
            };

            await ADMINS.insertOne(adminObj);

            if (reqData) {
                await NRs.deleteOne({ _id: reqData._id });
            }

            return res.json({ success: true, message: "Food Admin created successfully" });
        } else {
            return res.json({ success: false, message: "Not authorized." });
        }

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

/* =========================================================
   DASHBOARD DATA FOR FOOD
========================================================= */

export const RetriveNewFoodReqs = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { NRs } = getCollections(req);

            // Fetch requests for Food category
            const data = await NRs.find(
                { catagory: "Food" }, // Filter by Food category
                {
                    projection: {
                        fullname: 1, email: 1, whatsappnumber: 1, address: 1, IDCard: 1, type: 1,
                        phonenumber: 1
                    }
                }
            ).toArray();

            res.json({ success: true, ResponseData: data });
        } else {
            return res.json({ success: false, message: "Not authorized." });
        }

    } catch {
        res.json({ success: false });
    }
};

export const RetriveFoodDataForSP = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { ADMINS } = getCollections(req);

            // Find admins who have Food services (assuming ServiceType includes RESTAURANT or FOOD)
            // Ideally we check if ANY service is of type Food.
            // But here we rely on the specific string stored in ServiceType.
            // Let's assume user sends "Food" or "Restaurant" as type.
            // Better to filter where Services.ServiceType is NOT "SCHOOL"? 
            // Or explicitly "FOOD" or "RESTAURANT".
            // I'll filter by Services.ServiceType IN ["FOOD", "RESTAURANT"] if unsure, or just "RESTAURANT".
            // Based on frontend generic code, it might be flexible. 
            // For now I'll look for "RESTAURANT" or "Food".

            const admins = await ADMINS.find(
                { "Services.ServiceType": { $in: ["RESTAURANT", "Food", "Bakery", "Cafe", "Fast Food", "Local Food", "Street Food", "Fine Dining"] } },
                {
                    projection: {
                        AdminName: 1,
                        AdminEmail: 1,
                        whatsappnumber: 1,
                        Status: 1,
                        Verified: 1,
                        Services: 1,
                        location: 1,
                        phonenumber: 1,
                        IDCard: 1
                    }
                }
            ).toArray();

            const formattedData = admins.flatMap(admin =>
                admin.Services
                    .filter(service => ["RESTAURANT", "Food", "Bakery", "Cafe", "Fast Food", "Local Food", "Street Food", "Fine Dining"].includes(service.ServiceType))
                    .map(service => ({
                        adminId: admin._id,
                        adminName: admin.AdminName,

                        institutionId: service.ServiceId,
                        institutionName: service.ServiceName,
                        institutionType: service.ServiceType,
                        paymentPlan: service.PaymentPlan || "Free",

                        location: admin.location,
                        email: admin.AdminEmail,
                        whatsapp: admin.whatsappnumber,
                        phonenumber: admin.phonenumber || "",
                        IDCard: admin.IDCard || "",

                        status: admin.Status,
                        verified: admin.Verified
                    }))
            );

            return res.json({
                success: true,
                ResponseData: formattedData
            });

        } else {
            return res.json({ success: false, message: "Not authorized." });
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

/* =========================================================
   STATE & DELETE ACTIONS FOR FOOD
========================================================= */

export const ChangeFoodAdminVerificationState = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { ADMINS } = getCollections(req);
            const { adminId } = req.body;

            const admin = await ADMINS.findOne({ _id: new ObjectId(adminId) });
            if (!admin) return res.json({ success: false });

            await ADMINS.updateOne(
                { _id: admin._id },
                { $set: { Verified: !admin.Verified } }
            );

            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const ChangeFoodInstState = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { ADMINS, FOODS } = getCollections(req);
            const { adminId, InstId } = req.body;

            const admin = await ADMINS.findOne({ _id: new ObjectId(adminId) });
            if (!admin) return res.json({ success: false });

            const newState = !admin.Status; // Toggling status based on Admin status? 
            // In original code: const newState = !admin.Status; 
            // It toggles SCHOOLS status AND ADMINS status to matched value.

            await FOODS.updateOne(
                { _id: new ObjectId(InstId) },
                { $set: { Status: newState } }
            );

            await ADMINS.updateOne(
                { _id: admin._id },
                { $set: { Status: newState } }
            );

            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const DeleteTheFoodInst = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { ADMINS, FOODS } = getCollections(req);
            const { adminId, InstId } = req.body;

            const admin = await ADMINS.findOne({ _id: new ObjectId(adminId) });
            if (!admin) return res.json({ success: false });

            const foodService = await FOODS.findOne({ _id: new ObjectId(InstId) });

            if (foodService) {
                // Delete images from cloudinary if any
                const imageUrls = [];
                if (foodService.aboutImage) imageUrls.push(foodService.aboutImage);
                // Check formatting of foodService images (menu items etc)
                // Assuming menu items have 'img' property
                if (foodService.menuItems && Array.isArray(foodService.menuItems)) {
                    foodService.menuItems.forEach(item => {
                        if (item.img) imageUrls.push(item.img);
                    });
                }
                // ... other images

                await Promise.all(
                    imageUrls.map(url => {
                        const id = getPublicIdFromUrl(url);
                        return id ? cloudinary.uploader.destroy(id) : null;
                    })
                );
            }

            if (admin.Services.length === 1) {
                await FOODS.deleteOne({ _id: new ObjectId(InstId) });
                await ADMINS.deleteOne({ _id: admin._id });
                res.json({ success: true, message: "Admin and Food Service deleted." });
            } else {
                await FOODS.deleteOne({ _id: new ObjectId(InstId) });
                await ADMINS.updateOne(
                    { _id: admin._id },
                    { $pull: { Services: { ServiceId: new ObjectId(InstId) } } }
                );
                res.json({ success: true, message: "Food Service deleted." });
            }
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const DeleteFoodRequest = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Food")) {
            const { NRs } = getCollections(req);
            const { reqId } = req.body;

            await NRs.deleteOne({ _id: new ObjectId(reqId) });
            res.json({ success: true });
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
