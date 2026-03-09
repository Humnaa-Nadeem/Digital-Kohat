import { ObjectId } from "mongodb";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import cloudinary from "../Config/cloudinary.js";
import { checkPlanLimit, validatePlanFeature } from "../utils/planValidation.js";
import { getPublicIdFromUrl, selectCollection } from "../HelperFun/helperFun.js";
import { Admins } from "../Models/Admins.js";
import { NewServiceRequest } from "../Models/NewServiceRequest.js";
import { Schools, Colleges } from "../Models/Schemeas.js";
import planLimits from "../Config/planLimits.js";

export const getServiceModel = (type) => {
    const map = {
        SCHOOL: Schools,
        COLLEGE: Colleges
    };

    return map[type] || null;
};

/* =========================================================
   SUPER ADMIN SETUP & AUTH
========================================================= */

export const createInitialSuperAdmin = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        if (
            typeof name !== "string" ||
            typeof email !== "string" ||
            typeof password !== "string"
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid input types"
            });
        }

        const exists = await Admins.findOne({ Role: "SUPER_ADMIN" });

        if (exists) {
            return res.status(403).json({
                success: false,
                message: "Super Admin already exists"
            });
        }

        const passwordHash = await argon2.hash(password);

        await Admins.create({
            AdminName: name.trim(),
            AdminEmail: email.toLowerCase().trim(),
            AdminPassword: passwordHash,
            Role: "SUPER_ADMIN",
            Status: true,
            Verified: true
        });

        return res.status(201).json({
            success: true,
            message: "Super Admin created"
        });

    } catch (err) {

        console.error("createInitialSuperAdmin error:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

export const SuperAdminLogin = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password required"
            });
        }

        // 1. Get credentials from ENV for Main Super Admin
        const envEmail = process.env.SUPER_ADMIN_EMAIL?.toLowerCase().trim();
        const envPassword = process.env.SUPER_ADMIN_PASSWORD;

        if (!envEmail || !envPassword) {
            return res.status(500).json({ success: false, message: "System error: Security credentials not configured" });
        }

        const AdminColl = selectCollection(req, "Admins");

        // 2. Fetch the SuperAdmin record from DB (needed for ID and Managers list)
        const superAdminDoc = await AdminColl.findOne({ Role: "SUPER_ADMIN" });

        if (!superAdminDoc) {
            return res.status(500).json({ success: false, message: "System error: Super Admin not configured" });
        }

        // 3. Direct check against ENV for Main Super Admin
        const isSuperAdminMatch = (email.toLowerCase() === envEmail && password === envPassword);

        if (isSuperAdminMatch) {
            const token = JWT.sign(
                {
                    id: superAdminDoc._id,
                    role: "SUPER_ADMIN",
                    AccessTo: "All",
                    sessionVersion: Date.now()
                },
                process.env.JWT_KEY,
                { expiresIn: "1d" }
            );

            res.cookie("adm_token", token, {
                httpOnly: true,
                secure: false, // true in production
                sameSite: "lax",
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            });

            return res.json({
                success: true,
                role: "SUPER_ADMIN",
                AccessTo: "All",
                message: "Login successful (Env Auth)"
            });
        }

        // 4. Check if it's a Manager (stored in DB)
        // Managers are stored inside the SAManagers array of the SuperAdmin document
        const manager = superAdminDoc.SAManagers?.find(m => m.email === email.toLowerCase());

        if (manager) {
            const isPasswordValid = await argon2.verify(manager.password, password);

            if (isPasswordValid) {
                const token = JWT.sign(
                    {
                        id: superAdminDoc._id,
                        role: "SAManager",
                        AccessTo: manager.AccessTo,
                        sessionVersion: Date.now()
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

                return res.json({
                    success: true,
                    role: "SA_MANAGER",
                    AccessTo: manager.AccessTo,
                    message: "Manager Login successful"
                });
            }
        }

        return res.status(401).json({ success: false, message: "Invalid credentials" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Server error"
        });

    }
};

export const RetriveSuperAdminData = async (req, res) => {
    try {
        const superAdmin = await Admins.findOne({
            Role: "SUPER_ADMIN"
        }).lean();

        if (!superAdmin) {
            return res.json({
                success: false,
                message: "Super admin not found"
            });
        }

        if (req.token.role === "SUPER_ADMIN") {

            return res.json({
                success: true,
                data: superAdmin,
                AccessTo: "All",
                SAMail: superAdmin.AdminEmail
            });
        }

        if (req.token.role === "SAManager" && req.token.AccessTo === "Education") {
            return res.json({
                success: true,
                AccessTo: "Education"
            });
        }

        return res.status(403).json({
            success: false,
            message: "Not authorized"
        });

    } catch (err) {

        console.error("Retrieve error:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

/* =========================================================
   CREATE ADMIN
========================================================= */

export const CreateEduCataAdmin = async (req, res) => {
    try {
        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        const isAuth = role === "SUPER_ADMIN" ||
            (role === "SAManager" && (accessTo === "Education" || accessTo === "Business"));

        if (!isAuth) {
            return res.json({
                success: false,
                message: "Not authorized."
            });
        }


        const {
            AdminName,
            AdminEmail,
            ServiceName,
            ServiceLocation,
            ServiceType,
            PaymentPlan,
            reqId
        } = req.body;

        if (
            !AdminName ||
            !AdminEmail ||
            !ServiceName ||
            !ServiceType ||
            !PaymentPlan ||
            !reqId
        ) {
            return res.json({
                success: false,
                message: "All fields required"
            });
        }

        /* =====================================================
           Validate Request Data
        ===================================================== */

        const reqData = await NewServiceRequest.findById(reqId);

        if (!reqData) {
            return res.json({
                success: false,
                message: "Request not found"
            });
        }

        const ServiceCollection = getServiceModel(ServiceType);
        if (!ServiceCollection) {
            return res.json({
                success: false,
                message: "Invalid Service Type selected"
            });
        }

        let admin = await Admins.findOne({ AdminEmail: AdminEmail });

        /* =====================================================
           Admin Subscription & Limit Validation ⭐
        ===================================================== */

        if (admin) {
            // 1. Core Pre-Execution Validation
            const featureCheck = validatePlanFeature(admin, admin.Services?.length > 0 ? "Multiple Institutes" : "Management System");
            if (!featureCheck.allowed) {
                return res.json({
                    success: false,
                    message: featureCheck.message
                });
            }

            // 2. Additional Institute Limit Check (Current vs Max)
            const plan = admin.PaymentPlan || "FREE";
            const limits = planLimits[plan];
            const currentServicesCount = admin.Services?.length || 0;

            if (limits && currentServicesCount >= limits.institutes) {
                return res.json({
                    success: false,
                    message: `Limit reached: ${plan} plan only allows up to ${limits.institutes} institute(s).`
                });
            }
        }

        const planStartDate = new Date();
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + 30);

        if (!admin) {
            admin = await Admins.create({
                AdminName,
                AdminEmail: AdminEmail,
                AdminPassword: reqData.AdminPassword,
                Role: "ADMIN",
                Status: true,
                Verified: true,
                location: reqData.location || "",
                phonenumber: reqData.phonenumber || "",
                whatsappnumber: reqData.whatsappnumber || "",
                IDCard: reqData.IDCard || "",
                PaymentPlan: PaymentPlan,
                trialStartDate: planStartDate,
                trialEndDate: trialEndDate,
                PlanStartDate: planStartDate,
                PlanExpiry: trialEndDate,
                SubscriptionStatus: "Active"
            });
        }

        const serviceDoc = await ServiceCollection.create({
            ServiceName,
            ServiceType,
            Address: ServiceLocation,
            AdminId: admin._id,
            Status: true,
            isActive: true,
            PaymentPlan,
            trialStartDate: planStartDate,
            SubscriptionStatus: "Active",
            PlanStartDate: planStartDate,
            PlanExpiry: trialEndDate
        });

        /* =====================================================
           Service Snapshot Object
        ===================================================== */

        const serviceSnapshot = {
            ServiceId: serviceDoc._id,
            ServiceName,
            ServiceType,
            PaymentPlan,
            trialEndDate: trialEndDate,
            isActive: true,
            ServiceStatus: true,
            PlanStartDate: planStartDate,
            PlanExpiry: trialEndDate,
            SubscriptionStatus: "Active"
        };

        /* =====================================================
           Update Admin Services Array ⭐
        ===================================================== */

        await Admins.findByIdAndUpdate(
            admin._id,
            {
                $push: { Services: serviceSnapshot }
            }
        );

        /* =====================================================
           Delete Request Record
        ===================================================== */

        await NewServiceRequest.deleteOne({ _id: reqData._id });

        return res.json({
            success: true,
            message: "Admin and Service created successfully"
        });

    } catch (err) {

        console.error("CreateEduCataAdmin error:", err);

        return res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};

/* =========================================================
   DASHBOARD DATA
========================================================= */

export const RetriveEduTabDataForSP = async (req, res) => {
    try {
        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        const isAuth = role === "SUPER_ADMIN" ||
            (role === "SAManager" && (accessTo === "Education" || accessTo === "Business"));

        if (!isAuth) {
            return res.json({
                success: false,
                message: "Not authorized."
            });
        }


        const { category } = req.query; // Expect category from frontend

            const query = category ? { catagory: category } : { catagory: "Education" };

            const data = await NRs.find(
                query,
                {
                    projection: {
                        fullname: 1, email: 1, whatsappnumber: 1, address: 1, IDCard: 1, type: 1,
                        language: 1,
                        phonenumber: 1,
                        catagory: 1
                    }
                }
            ).toArray();

            res.json({ success: true, ResponseData: data });

        const { dataOf } = req.body; // SCHOOL or COLLEGE

        if (!dataOf) {
            return res.json({
                success: false,
                message: "Service type is required"
            });
        }

        const InstituteModel = getServiceModel(dataOf);
        if (!InstituteModel) {
            return res.json({
                success: false,
                message: "Invalid service type"
            });
        }

        // Use aggregation to join with Admins collection
        const institutions = await InstituteModel.aggregate([
            {
                // Convert AdminId (String) to ObjectId for lookup
                $addFields: {
                    adminObjectId: { $toObjectId: "$AdminId" }
                }
            },
            {
                $lookup: {
                    from: "Admins",
                    localField: "adminObjectId",
                    foreignField: "_id",
                    as: "adminInfo"
                }
            },
            {
                $unwind: {
                    path: "$adminInfo",
                    preserveNullAndEmptyArrays: true
                }
            }
        ]);

        const formattedData = institutions.map(inst => {
            const admin = inst.adminInfo || {};
            return {
                adminId: admin._id || inst.AdminId,
                adminName: admin.AdminName || "Unknown Admin",

                institutionId: inst._id,
                institutionName: inst.ServiceName,
                institutionType: inst.ServiceType,
                instituteStatus: inst.Status,

                paymentPlan: inst.PaymentPlan || "FREE",
                subscriptionStatus: inst.SubscriptionStatus || "Active",
                planExpiry: inst.PlanExpiry || inst.trialEndDate || null,
                trialEndDate: inst.trialEndDate,

                location: admin.location || inst.Address || "No location info",
                email: admin.AdminEmail || "",
                whatsapp: admin.whatsappnumber || "",
                phonenumber: admin.phonenumber || "",
                IDCard: admin.IDCard || "",

                verified: admin.Verified || false
            };
        });

        return res.json({
            success: true,
            ResponseData: formattedData // Frontend expects ResponseData
        });

    } catch (error) {
        console.error("RetriveEduTabDataForSP Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const RetriveNewAdmissionsForSP = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* ===============================
           Authorization Layer
        =============================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.json({
                success: false,
                message: "Not authorized."
            });
        }

        if (req.body.dataOf !== "NEW_ADMISSIONS") {
            return res.json({
                success: false,
                message: "Invalid data type"
            });
        }

        /* ===============================
           Collections
        =============================== */

        const NewAdmissionColl = selectCollection(req, "NewAdmission");
        const SchoolColl = selectCollection(req, "SCHOOL");
        const CollegeColl = selectCollection(req, "COLLEGE");
        const AdminColl = selectCollection(req, "Admins");

        /* ===============================
           Fetch Pending Admissions
        =============================== */

        const admissions = await NewAdmissionColl.find(
            { status: "pending" },
            {
                projection: {
                    studentName: 1,
                    fatherName: 1,
                    InstId: 1,
                    email: 1,
                    phone: 1,
                    WhatsAppNum: 1,
                    targetClass: 1,
                    paymentScreenshot: 1,
                    previousSchool: 1,
                    address: 1,
                    instituteSnapshot: 1,
                    adminSnapshot: 1
                }
            }
        ).toArray();

        if (!admissions.length) {
            return res.json({
                success: true,
                ResponseData: []
            });
        }

        /* ===============================
           Institute Batch Fetch
        =============================== */

        const instituteIds = [
            ...new Set(
                admissions.map(a => new ObjectId(a.InstId))
            )
        ];

        const schools = await SchoolColl.find(
            { _id: { $in: instituteIds } },
            {
                projection: {
                    ServiceName: 1,
                    Status: 1,
                    ServiceType: 1
                }
            }
        ).toArray();

        const colleges = await CollegeColl.find(
            { _id: { $in: instituteIds } },
            {
                projection: {
                    ServiceName: 1,
                    Status: 1,
                    ServiceType: 1
                }
            }
        ).toArray();

        const instituteMap = new Map();

        [...schools, ...colleges].forEach(inst => {
            instituteMap.set(String(inst._id), inst);
        });

        /* ===============================
           Admin Batch Fetch
        =============================== */

        const admins = await AdminColl.find(
            { "Services.ServiceId": { $in: instituteIds } },
            {
                projection: {
                    AdminName: 1,
                    AdminEmail: 1,
                    location: 1,
                    whatsappnumber: 1,
                    phonenumber: 1,
                    IDCard: 1,
                    Verified: 1,
                    Services: 1
                }
            }
        ).toArray();

        const adminMap = new Map();

        admins.forEach(admin => {
            admin.Services?.forEach(service => {
                adminMap.set(String(service.ServiceId), admin);
            });
        });

        /* ===============================
           Merge Response Data
        =============================== */

        const ResponseData = admissions.map(admission => {

            const institute = instituteMap.get(String(admission.InstId));
            const admin = adminMap.get(String(admission.InstId));

            return {
                admissionId: admission._id,

                studentName: admission.studentName,
                fatherName: admission.fatherName,
                email: admission.email,
                phone: admission.phone,
                WhatsAppNum: admission.WhatsAppNum,
                targetClass: admission.targetClass,
                previousSchool: admission.previousSchool,
                address: admission.address,
                paymentScreenshot: admission.paymentScreenshot,

                instituteId: admission.InstId,
                instituteName: institute?.ServiceName || "Unknown Institute",
                instituteStatus: institute?.Status ?? null,
                serviceType: institute?.ServiceType ?? null,

                adminName: admin?.AdminName || null,
                adminEmail: admin?.AdminEmail || null,
                adminWhatsapp: admin?.whatsappnumber || null,
                adminPhone: admin?.phonenumber || null,
                adminLocation: admin?.location || null,
                adminIDCard: admin?.IDCard || null,
                adminVerified: admin?.Verified ?? null
            };
        });

        return res.json({
            success: true,
            ResponseData
        });

    } catch (error) {

        console.error("RetriveNewAdmissionsForSP error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

export const CreateSAManager = async (req, res) => {

    try {

        /* =====================================================
           Authorization Layer ⭐
        ===================================================== */

        if (req.token.role !== "SUPER_ADMIN") {
            return res.json({
                success: false,
                message: "Not authorized."
            });
        }

        const { email, password, AccessTo } = req.body;

        if (!email || !password || !AccessTo) {
            return res.json({
                success: false,
                message: "email, password and AccessTo required."
            });
        }

        const lowerEmail = email.trim().toLowerCase();

        const AdminColl = selectCollection(req, "Admins");

        const adminId = new ObjectId(req.token.id);

        /* =====================================================
           Fetch Admin Document ⭐
        ===================================================== */

        const superAdmin = await AdminColl.findOne({
            _id: adminId
        });

        if (!superAdmin) {
            return res.json({
                success: false,
                message: "Invalid attempt."
            });
        }

        /* =====================================================
           Prevent Duplicate Manager Email ⭐
        ===================================================== */

        const managerExists = await AdminColl.findOne({
            "SAManagers.email": lowerEmail
        });

        if (managerExists) {
            return res.json({
                success: false,
                message: "Manager already exists."
            });
        }

        /* =====================================================
           Create Manager Object ⭐
        ===================================================== */

        const managerObj = {
            email: lowerEmail,
            password: await argon2.hash(password),
            AccessTo,
            createdAt: new Date()
        };

        /* =====================================================
           Atomic Database Update ⭐
        ===================================================== */

        await AdminColl.updateOne(
            { _id: adminId },
            {
                $push: {
                    SAManagers: managerObj
                }
            }
        )

        return res.json({
            success: true,
            message: "Manager added successfully."
        });

    } catch (error) {

        console.error("CreateSAManager error:", error);

        return res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

export const RetriveNewReqs = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        // Authorization
        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const ReqColl = selectCollection(req, "New Service Request");
        const AdminColl = selectCollection(req, "Admins");

        if (!ReqColl) {
            return res.status(500).json({
                success: false,
                message: "New Service Request collection not found"
            });
        }

        // Fetch requests
        const requests = await ReqColl.find(
            {},
            {
                projection: {
                    fullname: 1,
                    email: 1,
                    whatsappnumber: 1,
                    address: 1,
                    IDCard: 1,
                    type: 1,
                    language: 1,
                    phonenumber: 1,
                    status: 1,
                    catagory: 1,
                    createdAt: 1
                }
            }
        ).toArray();

        // Attach Admin PaymentPlan if admin exists
        const data = await Promise.all(
            requests.map(async (reqItem) => {

                if (!AdminColl || !reqItem.email) return reqItem;

                const admin = await AdminColl.findOne(
                    { AdminEmail: reqItem.email },
                    {
                        projection: {
                            PaymentPlan: 1,
                            SubscriptionStatus: 1,
                            PlanStartDate: 1,
                            PlanExpiry: 1,
                            trialStartDate: 1,
                            trialEndDate: 1
                        }
                    }
                );

                if (!admin) return reqItem;

                return {
                    ...reqItem,
                    PaymentPlan: admin.PaymentPlan,
                    SubscriptionStatus: admin.SubscriptionStatus,
                    PlanStartDate: admin.PlanStartDate,
                    PlanExpiry: admin.PlanExpiry,
                    trialStartDate: admin.trialStartDate,
                    trialEndDate: admin.trialEndDate
                };
            })
        );

        return res.status(200).json({
            success: true,
            ResponseData: data
        });

    } catch (error) {
        console.error("RetriveNewReqs Error:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong"
        });
    }
};

/* =========================================================
   STATE & DELETE ACTIONS
========================================================= */

export const ChangeAdminVerificationState = async (req, res) => {
    try {

        if (
            req.token.role !== "SUPER_ADMIN" &&
            !(req.token.role === "SAManager" && req.token.AccessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { adminId } = req.body;

        if (!adminId) {
            return res.status(400).json({
                success: false,
                message: "Admin ID is required"
            });
        }

        const AdminColl = selectCollection(req, "Admins");

        /* =====================================================
           Find Admin First ⭐ (Correct Pattern)
        ===================================================== */

        const admin = await AdminColl.findOne({
            _id: new ObjectId(adminId)
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        const newState = !admin.Verified;

        /* =====================================================
           Update Verification State ⭐
        ===================================================== */

        await AdminColl.updateOne(
            { _id: admin._id },
            {
                $set: {
                    Verified: newState
                }
            }
        );

        return res.status(200).json({
            success: true,
            newState
        });

    } catch (error) {

        console.error("ChangeAdminVerificationState Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const ChangeInstState = async (req, res) => {

    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { adminId, InstId, ServiceType } = req.body;

        if (!adminId || !InstId || !ServiceType) {
            return res.status(400).json({
                success: false,
                message: "adminId, InstId and ServiceType are required"
            });
        }

        /* ===============================
           Collection Selection
        =============================== */

        const InstituteColl = selectCollection(req, ServiceType);
        const AdminColl = selectCollection(req, "Admins");

        /* ===============================
           Find Institute
        =============================== */

        const institute = await InstituteColl.findOne({
            _id: new ObjectId(InstId)
        });

        if (!institute) {
            return res.status(404).json({
                success: false,
                message: "Institute not found"
            });
        }

        const newInstituteStatus = !institute.Status;
        const newIsActive = newInstituteStatus; // Sync isActive with Status toggle for disable functionality

        /* ===============================
           Update Institute Status
        =============================== */

        await InstituteColl.updateOne(
            { _id: new ObjectId(InstId) },
            { $set: { Status: newInstituteStatus, isActive: newIsActive } }
        );

        /* =====================================================
           Update Service Status Inside Admin Services Array
        ===================================================== */

        await AdminColl.updateOne(
            {
                _id: new ObjectId(adminId),
                "Services.ServiceId": new ObjectId(InstId)
            },
            {
                $set: {
                    "Services.$[elem].ServiceStatus": newInstituteStatus,
                    "Services.$[elem].isActive": newIsActive
                }
            },
            {
                arrayFilters: [
                    {
                        "elem.ServiceId": new ObjectId(InstId)
                    }
                ]
            }
        );

        return res.status(200).json({
            success: true,
            message: `Institute ${newIsActive ? "Activated" : "Disabled"} successfully`,
            instituteStatus: newInstituteStatus
        });

    } catch (error) {

        console.error("ChangeInstState Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export const DeleteTheInst = async (req, res) => {

    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* ===============================
           Authorization
        =============================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { adminId, InstId } = req.body;

        if (!adminId || !InstId) {
            return res.status(400).json({
                success: false,
                message: "adminId and InstId are required"
            });
        }

        const AdminColl = selectCollection(req, "Admins");
        const SchoolColl = selectCollection(req, "SCHOOL");
        const CollegeColl = selectCollection(req, "COLLEGE");

        /* ===============================
           Find Admin
        =============================== */

        const admin = await AdminColl.findOne({
            _id: new ObjectId(adminId)
        });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "Admin not found"
            });
        }

        /* ===============================
           Find Institute (Dynamic Collection)
        =============================== */

        let institute = await SchoolColl.findOne({
            _id: new ObjectId(InstId)
        });

        let ServiceColl = SchoolColl;

        if (!institute) {
            institute = await CollegeColl.findOne({
                _id: new ObjectId(InstId)
            });

            ServiceColl = CollegeColl;
        }

        if (!institute) {
            return res.status(404).json({
                success: false,
                message: "Institute not found"
            });
        }

        /* ===============================
           Delete Cloudinary Images
        =============================== */

        const imageUrls = [];

        if (institute.aboutImgUrl) imageUrls.push(institute.aboutImgUrl);
        if (institute.bannerUrl) imageUrls.push(institute.bannerUrl);

        if (Array.isArray(institute.staff)) {
            institute.staff.forEach(staff => {
                if (staff?.image) imageUrls.push(staff.image);
            });
        }

        if (Array.isArray(institute.gallery)) {
            imageUrls.push(...institute.gallery.filter(Boolean));
        }

        await Promise.all(
            imageUrls.map(async url => {
                try {
                    const id = getPublicIdFromUrl(url);
                    if (id) await cloudinary.uploader.destroy(id);
                } catch (err) {
                    console.log("Cloudinary delete error:", err.message);
                }
            })
        );

        /* ===============================
           Delete Institute Document
        =============================== */

        await ServiceColl.deleteOne({
            _id: new ObjectId(InstId)
        });

        /* ===============================
           Update Admin Document
        =============================== */

        const servicesLength = Array.isArray(admin.Services)
            ? admin.Services.length
            : 0;

        if (servicesLength <= 1) {

            await AdminColl.deleteOne({
                _id: admin._id
            });

        } else {

            await AdminColl.updateOne(
                { _id: admin._id },
                {
                    $pull: {
                        Services: {
                            ServiceId: new ObjectId(InstId)
                        }
                    }
                }
            );
        }

        return res.status(200).json({
            success: true,
            message: "Operation completed successfully"
        });

    } catch (error) {

        console.error("DeleteTheInst Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error"
        });
    }
};

export const DeleteRequest = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { reqId } = req.body;

        if (!reqId) {
            return res.status(400).json({
                success: false,
                message: "Request ID required."
            });
        }

        const Coll = selectCollection(req, "New Service Request");

        /* =====================================================
           Delete Request
        ===================================================== */

        const result = await Coll.deleteOne({
            _id: new ObjectId(reqId)
        });

        if (result.deletedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Request deleted successfully"
        });

    } catch (error) {

        console.error("DeleteRequest Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

export const ChangePaymentPlan = async (req, res) => {

    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { adminId, InstId, newPlan, ServiceType } = req.body;

        if (!adminId || !InstId || !newPlan || !ServiceType) {
            return res.status(400).json({
                success: false,
                message: "adminId, InstId, newPlan and ServiceType are required"
            });
        }

        const ServiceColl = selectCollection(req, ServiceType);
        const AdminColl = selectCollection(req, "Admins");

        /* =====================================================
           Expiry Logic
        ===================================================== */

        const now = new Date();
        let newExpiryDate = null;

        switch (newPlan) {

            case "FREE":
                newExpiryDate = new Date(now.setDate(now.getDate() + 30));
                break;

            case "Premium":
            case "PREMIUM":
                newExpiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
                break;

            case "Enterprise":
            case "ENTERPRISE":
                newExpiryDate = null;
                break;

            case "Basic":
            case "BASIC":
                newExpiryDate = new Date(now.setFullYear(now.getFullYear() + 1));
                break;

            default:
                return res.status(400).json({
                    success: false,
                    message: "Invalid payment plan"
                });
        }

        /* =====================================================
           ⭐ 1. Update Institute Document
        ===================================================== */

        const instituteUpdate = await ServiceColl.updateOne(
            { _id: new ObjectId(InstId) },
            {
                $set: {
                    PaymentPlan: newPlan,
                    plan: newPlan,
                    SubscriptionStatus: "Active",
                    PlanExpiry: newExpiryDate
                }
            }
        );

        if (instituteUpdate.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Institute not found"
            });
        }

        /* =====================================================
           ⭐ 2. Update Admin Subscription Fields (Root Level)
        ===================================================== */

        await AdminColl.updateOne(
            { _id: new ObjectId(adminId) },
            {
                $set: {
                    PaymentPlan: newPlan,
                    SubscriptionStatus: "Active",
                    PlanExpiry: newExpiryDate,
                    PlanStartDate: new Date()
                }
            }
        );

        /* =====================================================
           ⭐ 3. Update Admin Services Snapshot Array
        ===================================================== */

        await AdminColl.updateOne(
            {
                _id: new ObjectId(adminId),
                "Services.ServiceId": new ObjectId(InstId)
            },
            {
                $set: {
                    "Services.$.PaymentPlan": newPlan,
                    "Services.$.plan": newPlan,
                    "Services.$.SubscriptionStatus": "Active",
                    "Services.$.PlanExpiry": newExpiryDate
                }
            }
        );

        return res.status(200).json({
            success: true,
            newPlan,
            newExpiryDate
        });

    } catch (error) {

        console.error("ChangePaymentPlan Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// 🔹 NEW BUSINESS MANAGEMENT FUNCTIONS
export const GetBusinessesByStatus = async (req, res) => {
    try {
        const isAuth = req.token.role === "SuperAdmin" ||
            (req.token.role === "SAManager" && req.token.AccessTo === "Business");

        if (!isAuth) return res.json({ success: false, message: "Not authorized." });

        const { status } = req.body;
        const { ADMINS, NRs } = getCollections(req);
        const Business = (await import("../Models/business/Business.js")).default;

        let responseData = [];

        if (["approved", "suspended"].includes(status)) {
            // Fetch from Business Collection
            responseData = await Business.find({ status });
        } else {
            // Fetch from NRs Collection
            responseData = await NRs.find({ catagory: "Business", status }).toArray();
        }

        res.json({ success: true, responseData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const UpdateBusinessStatus = async (req, res) => {
    try {
        const isAuth = req.token.role === "SuperAdmin" ||
            (req.token.role === "SAManager" && req.token.AccessTo === "Business");

        if (!isAuth) return res.json({ success: false, message: "Not authorized." });

        const { id, status, fromCollection } = req.body;
        const { NRs } = getCollections(req);
        const Business = (await import("../Models/business/Business.js")).default;

        if (fromCollection === "Business") {
            await Business.findByIdAndUpdate(id, { status });
        } else {
            await NRs.updateOne({ _id: new ObjectId(id) }, { $set: { status } });
        }

        res.json({ success: true, message: `Status updated to ${status}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

export const DeleteThSAManager = async (req, res) => {
    try {

        const role = req.token.role;

        /* =====================================================
           Authorization
        ===================================================== */

        if (role !== "SUPER_ADMIN") {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { catagory } = req.body;

        if (!catagory) {
            return res.status(400).json({
                success: false,
                message: "Category is required."
            });
        }

        const AdminColl = selectCollection(req, "Admins");

        /* =====================================================
           Update Admin Document
        ===================================================== */

        const result = await AdminColl.updateOne(
            { _id: new ObjectId(req.token.id) },
            {
                $pull: {
                    SAManagers: { AccessTo: catagory }
                }
            }
        );

        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "Admin not found."
            });
        }

        if (result.modifiedCount === 0) {
            return res.status(400).json({
                success: false,
                message: "No manager found for this category."
            });
        }

        return res.status(200).json({
            success: true,
            message: `${catagory} manager deleted successfully.`
        });

    } catch (error) {

        console.error("DeleteThSAManager Error:", error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong."
        });
    }
};

export const ApproveAdmissionAndForward = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization Layer
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { admissionId } = req.body;

        if (!admissionId || !ObjectId.isValid(admissionId)) {
            return res.status(400).json({
                success: false,
                message: "Valid admissionId is required."
            });
        }

        /* =====================================================
           Collections
        ===================================================== */

        const NEW_ADMISSIONS = selectCollection(req, "NewAdmission");
        const ADMINS = selectCollection(req, "Admins");
        const SCHOOLS = selectCollection(req, "SCHOOL");
        const COLLEGES = selectCollection(req, "COLLEGE");
        const ADMISSIONS_RECORD = selectCollection(req, "AdmissionsRecord");

        let responsePayload = null;

        /* =====================================================
           Find Admission Request
        ===================================================== */

        const admission = await NEW_ADMISSIONS.findOne({
            _id: new ObjectId(admissionId)
        });

        if (!admission) {
            return res.status(404).json({
                success: false,
                message: "Admission request not found"
            });
        }

        if (admission.status !== "pending") {
            return res.json({
                success: false,
                message: `Admission request is already ${admission.status}`
            });
        }

        if (!admission.paymentScreenshot) {
            return res.json({
                success: false,
                message: "Payment screenshot is missing"
            });
        }

        /* =====================================================
           Detect Institute Type
        ===================================================== */

        let institute = await SCHOOLS.findOne({
            _id: new ObjectId(admission.InstId)
        });

        let serviceType = "SCHOOL";

        if (!institute) {
            institute = await COLLEGES.findOne({
                _id: new ObjectId(admission.InstId)
            });

            serviceType = "COLLEGE";
        }

        if (!institute) {
            return res.json({
                success: false,
                message: "Institute not found"
            });
        }

        /* =====================================================
           Find Admin Owner
        ===================================================== */

        const admin = await ADMINS.findOne({
            "Services.ServiceId": new ObjectId(admission.InstId)
        }, {
            projection: {
                AdminName: 1,
                AdminEmail: 1,
                whatsappnumber: 1,
                phonenumber: 1,
                location: 1,
                IDCard: 1,
                Verified: 1,
                Status: 1
            }
        });

        if (!admin) {
            return res.json({
                success: false,
                message: "Institute owner admin not found"
            });
        }

        /* =====================================================
           Forward Admission Record
        ===================================================== */

        const forwardObj = {
            admissionId: admission._id,
            studentName: admission.studentName,
            fatherName: admission.fatherName,
            email: admission.email,
            phone: admission.phone,
            WhatsAppNum: admission.WhatsAppNum,
            targetClass: admission.targetClass,
            previousSchool: admission.previousSchool || "",
            address: admission.address || "",
            paymentScreenshot: admission.paymentScreenshot,
            status: "approved",
            approvedBy: role,
            approvedAt: new Date(),
            createdAt: admission.createdAt || new Date(),

            instituteId: institute._id,
            instituteName: institute.ServiceName,
            serviceType,

            adminId: admin._id
        };

        /* =====================================================
           Insert Admission Record
        ===================================================== */

        await ADMISSIONS_RECORD.insertOne(forwardObj);

        /* =====================================================
           Remove Admission Request
        ===================================================== */

        await NEW_ADMISSIONS.deleteOne({
            _id: new ObjectId(admissionId)
        });

        responsePayload = {
            instituteId: institute._id,
            instituteName: institute.ServiceName,
            serviceType,
            adminId: admin._id,
            adminName: admin.AdminName,
            adminEmail: admin.AdminEmail
        };

        return res.json({
            success: true,
            message: "Admission approved and forwarded successfully.",
            forwardedTo: responsePayload
        });

    } catch (error) {

        console.error("ApproveAdmissionAndForward error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Something went wrong"
        });
    }
};

export const getInstituteRecords = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization Layer
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { adminId, institutionId } = req.body;

        if (!adminId || !institutionId) {
            return res.status(400).json({
                success: false,
                message: "Missing admin or institution ID."
            });
        }

        /* =====================================================
           ObjectId Validation ⭐
        ===================================================== */

        if (
            !ObjectId.isValid(adminId) ||
            !ObjectId.isValid(institutionId)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid ID format."
            });
        }

        const Coll = selectCollection(req, "AdmissionsRecord");

        /* =====================================================
           Query Records
        ===================================================== */

        const records = await Coll.find({
            instituteId: new ObjectId(institutionId),
            adminId: new ObjectId(adminId)
        }).sort({ approvedAt: -1 }).toArray();

        return res.status(200).json({
            success: true,
            count: records.length,
            records
        });

    } catch (error) {

        console.error("getInstituteRecords Error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

export const deleteAdmissionRequest = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization Layer
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { requestId } = req.body;

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: "Request ID is required."
            });
        }

        if (!ObjectId.isValid(requestId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid request ID format."
            });
        }

        const Coll = selectCollection(req, "NewAdmission");

        /* =====================================================
           Find Request First
        ===================================================== */

        const request = await Coll.findOne({
            _id: new ObjectId(requestId)
        });

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found."
            });
        }

        /* =====================================================
           Delete Cloudinary Image (Safe Execution)
        ===================================================== */

        if (request.paymentScreenshot) {
            try {

                const publicId = getPublicIdFromUrl(
                    request.paymentScreenshot
                );

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }

            } catch (cloudErr) {
                console.log("Cloudinary delete error:", cloudErr.message);
            }
        }

        /* =====================================================
           Delete Database Record
        ===================================================== */

        const deleted = await Coll.deleteOne({
            _id: new ObjectId(requestId)
        });

        if (deleted.deletedCount === 0) {
            return res.status(500).json({
                success: false,
                message: "Request deletion failed."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admission request deleted successfully."
        });

    } catch (error) {

        console.error("deleteAdmissionRequest error:", error);

        return res.status(500).json({
            success: false,
            message: "Server error."
        });
    }
};

export const deleteAdmissionRecord = async (req, res) => {
    try {

        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        /* =====================================================
           Authorization Layer
        ===================================================== */

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const { admissionId } = req.body;

        if (!admissionId) {
            return res.status(400).json({
                success: false,
                message: "Admission ID is required."
            });
        }

        if (!ObjectId.isValid(admissionId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid admission ID format."
            });
        }

        const Coll = selectCollection(req, "AdmissionsRecord");

        /* =====================================================
           Find Record First
        ===================================================== */

        const record = await Coll.findOne({
            admissionId: new ObjectId(admissionId)
        });

        if (!record) {
            return res.status(404).json({
                success: false,
                message: "Admission record not found."
            });
        }

        /* =====================================================
           Delete Cloudinary Image (Safe Execution)
        ===================================================== */

        if (record.paymentScreenshot) {
            try {

                const publicId = getPublicIdFromUrl(
                    record.paymentScreenshot
                );

                if (publicId) {
                    await cloudinary.uploader.destroy(publicId);
                }

            } catch (cloudErr) {
                console.log("Cloudinary delete error:", cloudErr.message);
            }
        }

        /* =====================================================
           Delete Database Record
        ===================================================== */

        const deleted = await Coll.deleteOne({
            admissionId: new ObjectId(admissionId)
        });

        if (deleted.deletedCount === 0) {
            return res.status(500).json({
                success: false,
                message: "Admission record deletion failed."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Admission record deleted successfully."
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Server error."
        });

    }
};

export const GetEducationNotificationCounts = async (req, res) => {
    try {
        const role = req.token.role;
        const accessTo = req.token.AccessTo;

        if (
            role !== "SUPER_ADMIN" &&
            !(role === "SAManager" && accessTo === "Education")
        ) {
            return res.status(403).json({
                success: false,
                message: "Not authorized."
            });
        }

        const NewAdmissionColl = selectCollection(req, "NewAdmission");
        const NewServiceRequestColl = selectCollection(req, "New Service Request");

        const admissionsCount = await NewAdmissionColl.countDocuments({ status: "pending" });
        const requestsCount = await NewServiceRequestColl.countDocuments({ catagory: "Education" });

        return res.status(200).json({
            success: true,
            admissionsCount,
            requestsCount
        });

    } catch (error) {
        console.error("GetEducationNotificationCounts Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};
