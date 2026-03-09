import JWT from "jsonwebtoken";
import argon2 from "argon2";
<<<<<<< HEAD
import { ObjectId } from "mongodb";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { sendOtpEmail } from "../utils/sendOtpEmail.js";
import { io } from "../index.js";
import { NewServiceRequest } from "../Models/NewServiceRequest.js";
import { Users } from "../Models/User.js";
import { UserOtpVerifications } from "../Models/UserOTPVerification.js";
import { selectCollection } from "../HelperFun/helperFun.js";
import { checkPlanLimit, validatePlanFeature } from "../utils/planValidation.js";
=======
const schoolColl = db.collection(process.env.S_C);
const foodColl = db.collection(process.env.FOOD_C);
const AdmnColl = db.collection(process.env.A_C);
const NRs = db.collection(process.env.NSPR_C); //NR => New Requests
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

export const RequestRegisterOtp = async (req, res) => {
    try {

        const { fullName, email, phone, password, address, DOB } = req.body;

        if (!fullName || !email || !password || !address || !DOB) {
            return res.json({
                success: false,
                message: "All required fields must be filled."
            });
        }

        if (password.length < 6) {
            return res.json({
                success: false,
                message: "Password must be at least 6 characters."
            });
        }

        const lowerEmail = email.trim().toLowerCase();

        /* =====================================================
           🔥 Check Existing User
        ===================================================== */

        const existingEmail = await Users.findOne({
            email: lowerEmail
        });

        if (existingEmail) {
            return res.json({
                success: false,
                message: "User already registered."
            });
        }

        if (phone) {

            const existingPhone = await Users.findOne({
                phone: phone.trim()
            });

            if (existingPhone) {
                return res.json({
                    success: false,
                    message: "Phone number already registered."
                });
            }
        }

        /* =====================================================
           🔥 Remove Previous OTP
        ===================================================== */

        await UserOtpVerifications.deleteOne({
            email: lowerEmail,
            purpose: "REGISTER"
        });

        /* =====================================================
           🔥 Generate OTP
        ===================================================== */

        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        const otpHash = await argon2.hash(otp);
        const passwordHash = await argon2.hash(password);

        /* =====================================================
           🔥 Store OTP Record
        ===================================================== */

        await UserOtpVerifications.create({
            email: lowerEmail,
            otpHash,
            purpose: "REGISTER",
            fullName: fullName.trim(),
            phone: phone ? phone.trim() : null,
            passwordHash,
            address: address.trim(),
            DOB,
            attempts: 0,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        /* =====================================================
           🔥 Send OTP Email
        ===================================================== */

        const emailSent = await sendOtpEmail(lowerEmail, otp);

        if (!emailSent) {

            await UserOtpVerifications.deleteOne({
                email: lowerEmail,
                purpose: "REGISTER"
            });

            return res.json({
                success: false,
                message: "OTP sending failed. Please try again."
            });
        }

        return res.json({
            success: true,
            message: "OTP sent to your email."
        });

    } catch (error) {

        console.error("RequestRegisterOtp error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

<<<<<<< HEAD
export const VerifyRegisterOtp = async (req, res) => {
    try {

        const { email, otp } = req.body;

        if (!email || !otp) {
            return res.json({
                success: false,
                message: "Email and OTP are required."
            });
        }

        const lowerEmail = email.trim().toLowerCase();

        const otpRecord = await UserOtpVerifications.findOne({
            email: lowerEmail,
            purpose: "REGISTER"
        });

        if (!otpRecord) {
            return res.json({
                success: false,
                message: "OTP expired or not found."
            });
        }

        if (otpRecord.attempts >= 5) {

            await UserOtpVerifications.deleteOne({
                _id: otpRecord._id
            });

            return res.json({
                success: false,
                message: "Too many wrong attempts."
            });
        }

        const isValidOtp = await argon2.verify(
            otpRecord.otpHash,
            otp.toString()
        );

        if (!isValidOtp) {

            await UserOtpVerifications.updateOne(
                { _id: otpRecord._id },
                { $inc: { attempts: 1 } }
            );

            return res.json({
                success: false,
                message: "Invalid OTP."
            });
        }

        const existingEmail = await Users.findOne({
            email: lowerEmail
        });

        if (existingEmail) {

            await UserOtpVerifications.deleteOne({
                _id: otpRecord._id
            });

            return res.json({
                success: false,
                message: "User already registered."
            });
        }

        const newUser = await Users.create({
            fullName: otpRecord.fullName,
            email: otpRecord.email,
            phone: otpRecord.phone,
            password: otpRecord.passwordHash,
            role: "user",
            address: otpRecord.address,
            DOB: otpRecord.DOB,
            isBlocked: false,
            isVerified: true
        });

        await UserOtpVerifications.deleteOne({
            _id: otpRecord._id
        });

        return res.json({
            success: true,
            message: "User registered successfully.",
            userId: newUser._id
        });

    } catch (error) {

        console.error("VerifyRegisterOtp error:", error);

        return res.json({
=======
// Getting all Food Card data
export const GettingFoodCrdDta = async (req, res) => {
    try {
        const services = await foodColl.find(
            { Status: true },
            {
                projection: {
                    ServiceName: 1,
                    Type: 1,
                    aboutImage: 1,
                    ratingData: 1,
                    about: 1,
                    cuisine: 1,
                    priceRange: 1,
                    deliveryAvailable: 1
                }
            }
        ).toArray();
        const approvedServices = [];

        for (const service of services) {
            const approvedAdmin = await AdmnColl.findOne(
                {
                    Verified: true,
                    "Services.ServiceId": new ObjectId(service._id)
                },
                {
                    projection: { _id: 1 }
                }
            );

            if (approvedAdmin) {
                approvedServices.push(service);
            }
        }

        const serviceCards = approvedServices.map(service => ({
            img: service.aboutImage || "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            InstName: service.ServiceName,
            serviceType: service.Type,
            Desc: service.about,
            rating: service.ratingData ? (service.ratingData.reduce((a, b) => a + b, 0) / service.ratingData.length).toFixed(1) : "4.5",
            id: service._id,
            cuisine: service.cuisine || "Multi-cuisine",
            priceRange: service.priceRange || "$$",
            deliveryAvailable: service.deliveryAvailable || true
        }));

        res.json({
            success: true,
            serviceCards,
            message: "Alhumdulilah, Food Data Fetched ......"
        });

    } catch (error) {
        console.error(error);
        res.json({
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
            success: false,
            message: error.message
        });
    }
};

<<<<<<< HEAD
export const LoginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        /* =====================================================
           1️⃣ Input Validation
        ===================================================== */

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            });
        }

        const UserColl = selectCollection(req, "Users");

        /* =====================================================
           2️⃣ User Lookup (Case Safe)
        ===================================================== */

        const user = await UserColl.findOne({
            email: email
        });

        /* =====================================================
           4️⃣ Check Account Verification
        ===================================================== */

        if (!user.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Please verify your account first."
            });
        }

        /* =====================================================
           5️⃣ Password Verification
        ===================================================== */

        const isMatch = await argon2.verify(
            user.password,
            password
        );

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        /* =====================================================
           6️⃣ JWT Token Generation (Minimal Payload ⭐)
        ===================================================== */

        const tokenPayload = {
            userId: user._id.toString(),
            role: user.role
        };

        const token = JWT.sign(
            tokenPayload,
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        );

        /* =====================================================
           7️⃣ Secure Cookie Configuration
        ===================================================== */

        res.cookie("user_token", token, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        });

        /* =====================================================
           8️⃣ Success Response (No Sensitive Data)
        ===================================================== */

        return res.status(200).json({
            success: true,
            message: "Login successful.",
        });

    } catch (error) {

        console.error("LoginUser error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
}

export const GetLoggedInUser = async (req, res) => {
    try {
        const UserColl = selectCollection(req, "Users");

        const user = await UserColl.findOne(
            { _id: new ObjectId(req.token.userId) },
            {
                projection: {
                    password: 0 // Never send password
                }
            }
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {

        console.error("GetLoggedInUser error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal server error."
        });
    }
};

export const GettingInstCrdDta = async (req, res) => {
    try {

        const { coll } = req.body;

        /* =====================================================
           Collection Security Layer ⭐
        ===================================================== */

        const allowedCollections = {
            SCHOOL: process.env.S_C,
            COLLEGE: process.env.C_C
        };

        const collectionName = allowedCollections[coll];

        if (!collectionName) {
            return res.json({
                success: false,
                message: "Invalid collection"
            });
        }

        const db = req.app.locals.db;

        const ServiceColl = db.collection(collectionName);
        const AdminColl = db.collection(process.env.A_C);

        /* =====================================================
           Fetch Active Services ⭐
        ===================================================== */

        const services = await ServiceColl.find({
            Status: true
        }).toArray();

        if (!services.length) {
            return res.json({
                success: true,
                serviceCards: []
            });
        }

        /* =====================================================
           Batch Fetch Approved Admins ⭐ (Performance Boost)
        ===================================================== */

        const serviceIds = services.map(s =>
            new ObjectId(s._id)
        );

        const admins = await AdminColl.find({
            Verified: true,
            "Services.ServiceId": {
                $in: serviceIds
            }
        }).project({
            Services: 1
        }).toArray();

        /* =====================================================
           Build Lookup Map ⭐ (Fast Matching)
        ===================================================== */

        const approvedServiceSet = new Set();

        admins.forEach(admin => {
            admin.Services?.forEach(service => {
                approvedServiceSet.add(
                    String(service.ServiceId)
                );
            });
        });

        /* =====================================================
           Filter Approved Services ⭐
        ===================================================== */

        const serviceCards = services
            .filter(service =>
                approvedServiceSet.has(String(service._id))
            )
            .map(service => ({
                img: service.basicInfo?.bannerUrl,
                serviceName: service.ServiceName,
                serviceType: service.ServiceType,
                Desc: service.basicInfo?.about,
                ratingData: service.ratingData || [],
                id: service._id
            }));
        return res.json({
            success: true,
            serviceCards
        });

    } catch (error) {

        console.error("GettingInstCrdDta error:", error);

        return res.json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

=======
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
// Getting School Whole data
export const GettingServiceWholeData = async (req, res) => {
    try {

        let { coll, InstId } = req.body;

        if (coll === "schools") {
            coll = "SCHOOL";
        }

        /* =====================================================
           Collection Security Layer ⭐
        ===================================================== */

        const ServiceColl = selectCollection(req, coll);
        const AdminColl = selectCollection(req, "Admins");

        /* =====================================================
           ObjectId Validation
        ===================================================== */

        if (!ObjectId.isValid(InstId)) {
            return res.json({
                success: false,
                message: "Invalid institute id"
            });
        }

        /* =====================================================
           Admin Verification Check ⭐
        ===================================================== */

        const adminVerified = await AdminColl.findOne(
            {
                "Services.ServiceId": new ObjectId(InstId)
            },
            {
                projection: {
                    Verified: 1,
                    Role: 1
                }
            }
        );


        if (!(adminVerified?.Role === "ADMIN" && adminVerified?.Verified)) {
            return res.json({
                success: false,
                serviceData: null,
                message: "Service is under process"
            });
        }

        /* =====================================================
           Fetch Service Data ⭐
        ===================================================== */

        const serviceData = await ServiceColl.findOne(
            { _id: new ObjectId(InstId) }
        );


        if (!serviceData) {
            return res.json({
                success: false,
                serviceData: null,
                message: "Service data not found"
            });
        }

        /* =====================================================
           Response Mapping (Frontend Compatible) ⭐
        ===================================================== */

        return res.json({
            success: true,
            serviceData
        });

    } catch (error) {

        console.error("GettingServiceWholeData error:", error);

        return res.json({
            success: false,
            message: error.message || "Server error"
        });
    }
};

export const GettingFoodWholeData = async (req, res) => {
    try {
        const { FoodId } = req.body;
        if (!FoodId || FoodId.length !== 24) {
            return res.json({ success: false, message: "Invalid Food ID provided." });
        }

        const adminVerified = await AdmnColl.findOne(
            { "Services.ServiceId": new ObjectId(FoodId) },
            { projection: { Verified: 1, Role: 1 } }
        );

        if (adminVerified?.Role === "ADMIN" && adminVerified?.Verified) {
            let [serviceData] = await foodColl
                .find({ _id: new ObjectId(FoodId), Status: true })
                .toArray();

            if (serviceData) {
                res.json({
                    success: true,
                    serviceData: {
                        id: serviceData._id,
                        bannerUrl: serviceData.bannerUrl || serviceData.aboutImage,
                        type: serviceData.Type,
                        name: serviceData.ServiceName || serviceData.name,
                        tagline: serviceData.tagline || "Fresh & Delicious",
                        about: serviceData.about,
                        aboutImage: serviceData.aboutImage,
                        menu: serviceData.menu || [],
                        categorizedMenu: serviceData.categorizedMenu || [],
                        quickInfo: {
                            basicProfile: {
                                name: serviceData.ServiceName || serviceData.name,
                                location: serviceData.quickInfo?.basicProfile?.location || serviceData.location || "Kohat, KPK",
                                type: serviceData.Type || "Restaurant"
                            },
                            timings: serviceData.timings || serviceData.quickInfo?.timings || { opening: "10:00 AM - 11:00 PM" },
                            facilities: serviceData.quickInfo?.facilities || serviceData.facilities || ["Dine-in", "Takeaway", "Delivery"]
                        },
                        contact: serviceData.contact || { phone: "N/A", email: "N/A" },
                        deliveryAvailability: serviceData.deliveryAvailability || "Available",
                        ratingData: serviceData.ratingData || [],
                        detailedReviews: serviceData.detailedReviews || [],
                        promotions: serviceData.promotions || [],
                        reportCount: serviceData.reportCount || 0,
                        reportStatus: serviceData.reportStatus || "Active",
                        reports: serviceData.reports || [],
                    },
                    message: "Alhumdulilah Food Data Fetched ......"
                });
            } else {
                res.json({
                    success: false,
                    serviceData: null,
                    message: "Food service data not found"
                });
            }
        } else {
            res.json({
                success: false,
                serviceData: null,
                message: "Service is under process"
            });
        }
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
};

export const ReportServiceLanding = async (req, res) => {
    try {
        const { id, reason, details, reporterName } = req.body;
        const ip = (req.socket?.remoteAddress || req.ip).replace("::ffff:", "");

        const report = {
            id: new ObjectId(),
            reporterName: reporterName || "Anonymous",
            reason,
            details,
            ip,
            timestamp: new Date(),
            status: "Pending"
        };

        let food = await foodColl.findOne({ _id: new ObjectId(id) });
        if (food) {
            await foodColl.updateOne(
                { _id: new ObjectId(id) },
                {
                    $push: { reports: report },
                    $inc: { reportCount: 1 }
                }
            );
            return res.json({ success: true, message: "Report submitted successfully. We will investigate." });
        }
        return res.json({ success: false, message: "Service not found." });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Changing the Service Rating and adding Reviews
export const ChangeRatingData = async (req, res) => {
    try {
<<<<<<< HEAD

        const { rating, id, coll } = req.body;
        const userId = req.token.userId;

        /* =====================================================
           Validation
        ===================================================== */

        if (!rating || !id || !userId) {
            return res.json({
                success: false,
                message: "Invalid data or not logged in"
            });
        }
=======
        let { ratingData, id } = req.body;
        const ip = (req.socket?.remoteAddress || req.ip).replace("::ffff:", "");

        // Original School Flow: If it's a school, use $set
        let school = await schoolColl.findOne({ _id: new ObjectId(id) });
        if (school) {
            let OldRatedIPsArr = school.RatedIPs || [];
            if (OldRatedIPsArr.includes(ip)) {
                return res.json({ success: false, message: "Your rating is added already" });
            }
            OldRatedIPsArr.push(ip);
            await schoolColl.updateOne(
                { _id: new ObjectId(id) },
                { $set: { RatedIPs: OldRatedIPsArr, ratingData } }
            );
            return res.json({ success: true, message: "Rating submitted successfully!" });
        }

        // New Food Flow: If it's food, use $push for multi-reviews
        let food = await foodColl.findOne({ _id: new ObjectId(id) });
        if (food) {
            let OldRatedIPsArr = food.RatedIPs || [];
            if (OldRatedIPsArr.includes(ip)) {
                return res.json({ success: false, message: "Your review is added already." });
            }
            OldRatedIPsArr.push(ip);

            const updateQuery = {
                $set: { RatedIPs: OldRatedIPsArr },
                $push: { ratingData: ratingData }
            };

            // If rating is bad (1 or 2), increment report count
            if (ratingData.rating <= 2) {
                updateQuery.$inc = { reportCount: 1 };
            }

            await foodColl.updateOne(
                { _id: new ObjectId(id) },
                updateQuery
            );
            return res.json({ success: true, message: "Review submitted successfully!" });
        }

        return res.json({ success: false, message: "Service not found." });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

        const ratingNumber = Number(rating);

        if (ratingNumber < 1 || ratingNumber > 5) {
            return res.json({
                success: false,
                message: "Rating must be between 1 and 5"
            });
        }

        /* =====================================================
           Collection Protection Layer ⭐
           Prevent client-controlled collection access
        ===================================================== */

        const ServiceColl = selectCollection(req, coll);

        /* =====================================================
           ObjectId Validation
        ===================================================== */

        if (!ObjectId.isValid(id)) {
            return res.json({
                success: false,
                message: "Invalid institute id"
            });
        }

        /* =====================================================
           Check Institute Exists
        ===================================================== */

        const institute = await ServiceColl.findOne(
            { _id: new ObjectId(id) },
            {
                projection: {
                    ratingData: 1
                }
            }
        );

        if (!institute) {
            return res.json({
                success: false,
                message: "Institute not found"
            });
        }

        /* =====================================================
           Duplicate Rating Protection ⭐
        ===================================================== */

        if (institute.ratingData?.userRatings?.[userId]) {
            return res.json({
                success: false,
                message: "You have already rated this institute"
            });
        }

        /* =====================================================
   Initialize ratingData if NULL ⭐
===================================================== */

        await ServiceColl.updateOne(
            {
                _id: new ObjectId(id),
                ratingData: null
            },
            {
                $set: {
                    ratingData: {
                        totalStars: 0,
                        totalReviews: 0,
                        userRatings: {}
                    }
                }
            }
        );

        /* =====================================================
           Now Safe Atomic Rating Update ⭐
        ===================================================== */

        const updateResult = await ServiceColl.updateOne(
            { _id: new ObjectId(id) },
            {
                $inc: {
                    "ratingData.totalStars": ratingNumber,
                    "ratingData.totalReviews": 1
                },
                $set: {
                    [`ratingData.userRatings.${userId}`]: ratingNumber
                }
            }
        );

        if (updateResult.matchedCount === 0) {
            return res.json({
                success: false,
                message: "Rating update failed"
            });
        }

        /* =====================================================
           Recalculate Average ⭐
        ===================================================== */

        const updatedInstitute = await ServiceColl.findOne(
            { _id: new ObjectId(id) },
            {
                projection: {
                    ratingData: 1
                }
            }
        );

        if (updatedInstitute?.ratingData) {

            const rd = updatedInstitute.ratingData;

            if (rd.totalReviews > 0) {
                rd.average = rd.totalStars / rd.totalReviews;

                await ServiceColl.updateOne(
                    { _id: new ObjectId(id) },
                    {
                        $set: {
                            ratingData: rd
                        }
                    }
                );
            }
        }

        return res.json({
            success: true,
            ratingData: updatedInstitute.ratingData
        });

    } catch (error) {

        console.error("ChangeRatingData error:", error);

        return res.json({
            success: false,
            message: error.message
        });
    }
};

export const NewEduCataServiceRequest = async (req, res) => {
    try {
<<<<<<< HEAD

        const {
            email,
            fullname,
            phonenumber,
            whatsappnumber,
            IDCard,
            password,
            language,
            address,
            category,
            type
        } = req.body;

        /* =====================================================
           Field Validation
        ===================================================== */

        if (
            !email ||
            !fullname ||
            !phonenumber ||
            !IDCard ||
            !password ||
            !whatsappnumber ||
            !address ||
            !category ||
            !type
        ) {
            return res.json({
                success: false,
                message: "Required fields are missing."
            });
        }

        /* =====================================================
           Duplicate Request Check
        ===================================================== */

        const RequestExsist = await NewServiceRequest.findOne({
            email,
            fullname,
            phonenumber,
            IDCard
        });

        if (RequestExsist) {

            const sameSP = await argon2.verify(
                RequestExsist.AdminPassword,
                password
            );

            if (sameSP) {
                return res.json({
                    success: false,
                    message: "Request already exist."
                });
            }
        }

        /* =====================================================
           Password Hashing
        ===================================================== */

        const hashpassword = await argon2.hash(password);

        /* =====================================================
           Allowed Fields Only
        ===================================================== */

        const requestObj = {
            email,
            fullname,
            phonenumber,
            whatsappnumber,
            location: address,
            IDCard,
            language,
            AdminPassword: hashpassword,
            Status: true,
            catagory: category,
            type: type,
            createdAt: new Date()
        };

        /* =====================================================
           Create Request
        ===================================================== */

        await NewServiceRequest.create(requestObj);

        /* =====================================================
           Real-time Notification
        ===================================================== */

        if (io) {

            io.to("superadmin").emit("new_notification", {
                type: "NEW_SERVICE_REQUEST",
                message: `New ${category} service request from ${fullname}`,
                createdAt: new Date(),
                data: {
                    email,
                    fullname,
                    phonenumber,
                    IDCard,
                    category,
                    type
                }
            });

            io.emit("service_request_created", {
                fullname,
                email,
                category,
                type
            });
        }

        /* =====================================================
           Response
        ===================================================== */

        return res.json({
            success: true,
            message: "Request submitted successfully."
        });

    } catch (error) {

        console.log("NewEduCataServiceRequest Error:", error);

        return res.json({
            success: false,
            message: "Something went wrong."
        });
=======
        let RequestExsist = await NRs.findOne({ email: req.body.email, fullname: req.body.fullname, phonenumber: req.body.phonenumber, IDCard: req.body.IDCard }, { projection: { password: 1 } });
        let sameSP = false;
        if (RequestExsist) {
            sameSP = await argon2.verify(RequestExsist.password, req.body.password);
        }
        if (sameSP) {
            return res.json({ success: false, message: "Request already exists." });
        }

        if (!RequestExsist) {
            let hashpassword = await argon2.hash(req.body.password);
            req.body.password = hashpassword;
            req.body.Status = true;
            req.body.catagory = req.body.catagory || "Education";
            req.body.type = req.body.type || "SCHOOL";
            await NRs.insertOne(req.body);
            return res.json({ success: true });
        }

        // If request exists but password doesn't match
        return res.json({ success: false, message: "A request with these details already exists." });

    } catch (error) {
        console.error("NewEduCataServiceRequest error:", error);
        return res.json({ success: false, message: "Something went wrong." })
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
    }
};

export const NewInstAdmssnReqFun = async (req, res) => {
    try {

        const {
            studentName,
            fatherName,
            email,
            phone,
            WhatsAppNum,
            targetClass,
            previousSchool,
            address,
            id,
            Coll
        } = req.body;

        /* =====================================================
           Validation
        ===================================================== */

        if (!studentName || !fatherName || !email || !id) {
            return res.json({
                success: false,
                message: "Required fields are missing"
            });
        }

        if (!req.files || !req.files[0]) {
            return res.json({
                success: false,
                message: "Payment screenshot is required"
            });
        }

        const NewAdmissionColl = selectCollection(req, "NewAdmission");
        const InstituteColl = selectCollection(req, Coll);
        const AdminColl = selectCollection(req, "Admins");

        /* =====================================================
           Duplicate Admission Check
        ===================================================== */

        const admissionExist = await NewAdmissionColl.findOne({
            studentName,
            fatherName,
            InstId: id,
            email
        });

        if (admissionExist) {
            return res.json({
                success: false,
                message: "Request already exists."
            });
        }

        /* =====================================================
           Upload Screenshot
        ===================================================== */

        let uploadResult;

        try {
            uploadResult = await uploadToCloudinary(
                req.files[0],
                "admissions"
            );
        } catch (uploadError) {
            return res.json({
                success: false,
                message: "Screenshot upload failed, Check your internet connection"
            });
        }

        /* =====================================================
           Fetch Institute Data Snapshot
        ===================================================== */

        const institute = await InstituteColl.findOne({
            _id: new ObjectId(id)
        });

        /* =====================================================
           Fetch Admin Data Snapshot
        ===================================================== */

        let admin = null;

        if (institute?.AdminId) {
            admin = await AdminColl.findOne({
                _id: new ObjectId(institute.AdminId)
            })
        }

        /* =====================================================
           Plan Feature & Limit Validation (Using Admin Plan) ⭐
        ===================================================== */
        const featureCheck = validatePlanFeature(admin || institute, "Online Admission");
        if (!featureCheck.allowed) {
            return res.json({
                success: false,
                message: featureCheck.message
            });
        }

        const currentAdmissionsCount = await NewAdmissionColl.countDocuments({ InstId: id });
        const limitCheck = checkPlanLimit(admin || institute, 'onlineAdmissions', currentAdmissionsCount);

        if (!limitCheck.allowed) {
            return res.json({
                success: false,
                message: limitCheck.message
            });
        }

        /* =====================================================
           Admission Document (Combined Snapshot)
        ===================================================== */

        const admissionObj = {
            studentName,
            fatherName,
            email,
            phone,
            WhatsAppNum,
            targetClass,
            previousSchool: previousSchool || "",
            address: address || "",
            InstId: id,

            paymentScreenshot: uploadResult.secure_url,
            status: "pending",

            /* ---------- Institute Snapshot ---------- */

            instituteSnapshot: {
                instituteId: institute?._id || null,
                instituteName: institute?.ServiceName || "Unknown Institute",
                instituteStatus: institute?.Status ?? null,
                serviceType: institute?.ServiceType ?? null
            },

            /* ---------- Admin Snapshot ---------- */

            adminSnapshot: {
                adminName: admin?.AdminName || null,
                adminEmail: admin?.AdminEmail || null,
                adminWhatsapp: admin?.whatsappnumber || null,
                adminPhone: admin?.phonenumber || null,
                adminLocation: admin?.location || null,
                adminIDCard: admin?.IDCard || null,
                adminVerified: admin?.Verified ?? null
            },

            createdAt: new Date()
        };

        /* =====================================================
           Insert Admission Record
        ===================================================== */

        await NewAdmissionColl.insertOne(admissionObj);

        /* =====================================================
   Real-time Notification ⭐
===================================================== */

        if (io) {
            io.to("superadmin").emit("new_notification", {
                type: "NEW_ADMISSION_REQUEST",
                message: `New ADMISSION request from ${studentName}`,
                createdAt: new Date(),
                data: {
                    email,
                    studentName,
                    WhatsAppNum,
                    targetClass,
                    phone
                }
            });

            io.emit("education_admission_request_created", {
                studentName,
                email
            });
        }

        return res.json({
            success: true,
            message: "Admission request submitted successfully"
        });

    } catch (error) {

        console.error("ApplyAdmission error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Server error"
        });
    }
};