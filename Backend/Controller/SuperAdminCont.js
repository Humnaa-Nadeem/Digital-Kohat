import { ObjectId } from "mongodb";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import cloudinary from "../Config/cloudinary.js";
import { SERVICE_COLLECTION } from "./SchlAndColDshBrdContr.js";
import { getCollections, getPublicIdFromUrl } from "../HelperFun/helperFun.js";
/* =========================================================
   SUPER ADMIN SETUP & AUTH
========================================================= */

export const createInitialSuperAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const { ADMINS } = getCollections(req);

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({ message: "Invalid input types" });
        }

        const exists = await ADMINS.findOne({ role: "SUPER_ADMIN" });
        if (exists) {
            return res.status(403).json({
                message: "Super Admin already exists"
            });
        }

        const passwordHash = await argon2.hash(password);

        const superAdminDoc = {
            name: name.trim(),
            email: email.toLowerCase().trim(),
            passwordHash,
            role: "SUPER_ADMIN",
            status: "Active",
            createdAt: new Date()
        };

        await ADMINS.insertOne(superAdminDoc);

        res.status(201).json({
            success: true,
            message: "Super Admin created"
        });

    } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
    }
};

export const SuperAdminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { ADMINS } = getCollections(req);

        const superAdmin = await ADMINS.findOne({
            email: email.toLowerCase(),
            role: "SUPER_ADMIN"
        });

        if (!superAdmin) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        let match = await argon2.verify(superAdmin.passwordHash, password);
        if (!match) {
            let managerAccess;
            for (const manager of superAdmin.SAManagers || []) {
                match = await argon2.verify(manager.password, password);
                if (match) {
                    managerAccess = manager.AccessTo;
                }
                break;
            }

            const token = JWT.sign(
                {
                    id: superAdmin._id,
                    role: "SAManager",
                    AccessTo: managerAccess
                },
                process.env.JWT_KEY,
                { expiresIn: "1d" }
            );

            res.cookie("adm_token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ success: true, message: "Login successful" });

        } else {

            const token = JWT.sign(
                {
                    id: superAdmin._id,
                    role: "SuperAdmin",
                    AccessTo: "All"
                },
                process.env.JWT_KEY,
                { expiresIn: "1d" }
            );

            res.cookie("adm_token", token, {
                httpOnly: true,
                secure: false,
                sameSite: "lax",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({ success: true, message: "Login successful" });
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const RetriveSuperAdminData = async (req, res) => {
    try {
        const { ADMINS } = getCollections(req);
        const superAdmin = await ADMINS.findOne({ role: "SUPER_ADMIN" });
        if (req.token.role === "SuperAdmin") {
            res.json({ success: true, data: superAdmin, AccessTo: "All", SAMail: superAdmin.email });
        } else if (req.token.role === "SAManager") {
            res.json({ success: true, AccessTo: req.token.AccessTo });
        } else {
            return (res.json({ success: false, message: "Not authorized." }))
        }

    } catch (err) {
        res.status(500).json({ success: false, message: "Server error" });
    }
}

/* =========================================================
   CREATE ADMIN
========================================================= */

export const CreateEduCataAdmin = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {

            const {
                AdminName,
                AdminEmail,
                AdminIDCard,
                ServiceName,
                ServiceLocation,
                ServiceType,
                PaymentPlan,
                reqId
            } = req.body;

            if (!AdminName || !AdminEmail || !ServiceName || !ServiceType || !PaymentPlan) {
                return res.json({ success: false, message: "All fields required" });
            }

            const { ADMINS, NRs } = getCollections(req);

            const ServiceCollection = SERVICE_COLLECTION[ServiceType];
            if (!ServiceCollection) {
                return res.json({ success: false, message: "Invalid ServiceType" });
            }
            let admin = await ADMINS.findOne({
                AdminEmail,
                IDCard: AdminIDCard,
                AdminName
            });
            const serviceResult = await ServiceCollection.insertOne({
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
            const reqData = await NRs.findOne({
                _id: new ObjectId(reqId),
                email: AdminEmail,
                fullname: AdminName,
                IDCard: AdminIDCard
            });

            if (!reqData) {
                return res.json({ success: false, message: "Request not found" });
            }

            const adminObj = {
                AdminName,
                AdminEmail,
                location: ServiceLocation,
                whatsappnumber: reqData.whatsappnumber,
                phonenumber: reqData.phonenumber,
                IDCard: reqData.IDCard,
                Status: reqData.Status,
                AdminPassword: reqData.password,
                Role: "ADMIN",
                Verified: true,
                Services: [serviceObj],
                Managers: [],
                createdAt: new Date()
            };

            await ADMINS.insertOne(adminObj);
            await NRs.deleteOne({ _id: reqData._id });

            return res.json({ success: true, message: "Admin created successfully" });
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
   DASHBOARD DATA
========================================================= */

export const RetriveNewReqs = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
            const { NRs } = getCollections(req);

            const data = await NRs.find(
                { catagory: "Education", type: "SCHOOL" },
                {
                    projection: {
                        fullname: 1, email: 1, whatsappnumber: 1, address: 1, IDCard: 1, type: 1,
                        language: 1,
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

export const RetriveSchoolDataForSP = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
            const { ADMINS } = getCollections(req);

            const admins = await ADMINS.find(
                { "Services.ServiceType": "SCHOOL" },
                {
                    projection: {
                        AdminName: 1,
                        AdminEmail: 1,
                        whatsappnumber: 1,
                        PaymentPlan: 1,
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
                    .filter(service => service.ServiceType === "SCHOOL")
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

export const CreateSAManager = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin") {
            let { ADMINS } = getCollections(req);
            const existingSuperAdmin = await ADMINS.findOne({ _id: new ObjectId(req.token.id), email: req.body.email });
            if (!existingSuperAdmin) {
                return (res.json({ success: false, message: "In-valid Attempt" }))
            } else {
                let AllManagers = existingSuperAdmin.SAManagers;

                let managerExist = false;

                for (let i = 0; i < AllManagers.length; i++) {
                    if (AllManagers[i].AccessTo === req.body.AccessTo) {
                        managerExist = true;
                    }
                }

                if (!managerExist) {
                    let UpdatedManagers = [...AllManagers, {
                        password: await argon2.hash(req.body.password),
                        AccessTo: req.body.AccessTo
                    }];
                    await ADMINS.updateOne({ _id: new ObjectId(req.token.id), email: req.body.email }, { $set: { SAManagers: UpdatedManagers } });
                    return (res.json({ success: true, message: "Manager Added" }));
                } else {
                    return (res.json({ success: false, message: "Manager already exsist." }))
                }


            }
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        res.json({ success: false, message: "Something went wrong ." })
    }
}

/* =========================================================
   STATE & DELETE ACTIONS
========================================================= */

export const ChangeAdminVerificationState = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
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

export const ChangeInstState = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
            const { ADMINS, SCHOOLS } = getCollections(req);
            const { adminId, InstId } = req.body;

            const admin = await ADMINS.findOne({ _id: new ObjectId(adminId) });
            if (!admin) return res.json({ success: false });

            const newState = !admin.Status;

            await SCHOOLS.updateOne(
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

export const DeleteTheInst = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
            const { ADMINS, SCHOOLS } = getCollections(req);
            const { adminId, InstId } = req.body;

            const admin = await ADMINS.findOne({ _id: new ObjectId(adminId) });
            if (!admin) return res.json({ success: false });

            const institute = await SCHOOLS.findOne({ _id: new ObjectId(InstId) });

            if (institute) {
                const imageUrls = [];

                if (institute.aboutImgUrl) imageUrls.push(institute.aboutImgUrl);
                if (institute.bannerUrl) imageUrls.push(institute.bannerUrl);

                if (Array.isArray(institute.staff)) {
                    institute.staff.forEach(staffMember => {
                        if (staffMember.image) {
                            imageUrls.push(staffMember.image);
                        }
                    });
                }

                if (Array.isArray(institute.gallery)) {
                    imageUrls.push(...institute.gallery);
                }

                await Promise.all(
                    imageUrls.map(url => {
                        const id = getPublicIdFromUrl(url);
                        return id ? cloudinary.uploader.destroy(id) : null;
                    })
                );

            }

            // 🔹 YOUR ORIGINAL LOGIC (UNCHANGED)
            if (admin.Services.length === 1) {
                await SCHOOLS.deleteOne({ _id: new ObjectId(InstId) });
                await ADMINS.deleteOne({ _id: admin._id });
                res.json({ success: true, message: "Admin and Institute deleted." });
            } else {
                await SCHOOLS.deleteOne({ _id: new ObjectId(InstId) });
                await ADMINS.updateOne(
                    { _id: admin._id },
                    { $pull: { Services: { ServiceId: new ObjectId(InstId) } } }
                );
                res.json({ success: true, message: "Institute deleted." });
            }
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const DeleteRequest = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
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

export const ChangePaymentPlan = async (req, res) => {
    try {
        if (req.token.role === "SuperAdmin" || (req.token.role === "SAManager" && req.token.AccessTo === "Education")) {
            const { ADMINS } = getCollections(req);
            const { adminId, InstId, newPlan } = req.body;

            await ADMINS.updateOne(
                {
                    _id: new ObjectId(adminId),
                    "Services.ServiceId": new ObjectId(InstId)
                },
                { $set: { "Services.$.PaymentPlan": newPlan } }
            );

            res.json({ success: true, newPlan });
        } else {
            res.json({ success: false, message: "Not authorized." });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const DeleteThSAManager = async (req, res) => {
    try {
        if (req.token.role !== "SuperAdmin") {
            return res.json({ success: false, message: "Not authorized." });
        }

        const { catagory } = req.body;
        const { ADMINS } = getCollections(req);

        if (!catagory) {
            return res.json({ success: false, message: "Category is required." });
        }

        const result = await ADMINS.updateOne(
            { _id: new ObjectId(req.token.id) },
            {
                $pull: {
                    SAManagers: { AccessTo: catagory }
                }
            }
        );

        if (result.modifiedCount === 0) {
            return res.json({
                success: false,
                message: "No manager found for this category."
            });
        }

        return res.json({
            success: true,
            message: `${catagory} manager deleted successfully.`
        });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Something went wrong." });
    }
};