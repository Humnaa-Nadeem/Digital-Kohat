import { MongoClient, ObjectId } from "mongodb";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import { uploadToCloudinary } from "../utils/cloudinaryUpload.js";
import { getPublicIdFromUrl } from "../HelperFun/helperFun.js";
import cloudinary from "../Config/cloudinary.js";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("DSCH");
const schoolColl = db.collection(process.env.S_C);
const AdmnColl = db.collection(process.env.A_C);

// Verifying the Admin
export const AdminLoginFun = async (req, res) => {
    let AdmnData = await AdmnColl.findOne({ email: req.body.email });
    if (AdmnData) {
        let instituteId = AdmnData.InstId.toString();
        let verfied = await argon2.verify(AdmnData.password, req.body.password);
        if (verfied && AdmnData.Role === "Admin" && AdmnData.verified === "Verified") {
            let token = JWT.sign({ instId: instituteId, instName: AdmnData.InstName, role: "admin", verifired: AdmnData.verified }, process.env.JWT_KEY, {
                expiresIn: "1d"
            });
            res.cookie("adm_token", token, {
                httpOnly: true,
                secure: false, // true ---> production
                sameSite: "lax", // none ---> production
                path: "/",
                maxAge: 24 * 60 * 60 * 1000
            })
            res.json({ success: true, message: "Alhumdulilah Its okay", token });
        } else {
            res.json({ success: false, message: "Invalid email or password" });
        }
    } else {
        res.json({ success: false, message: "Invalid email or password" });
    }
}

// Getting the Institute data according to admin:
export const RetriveTheDashboardDta = async (req, res) => {
    let instId = req.admin.instId;
    let instName = req.admin.instName;
    let role = req.admin.role;
    if (role !== "admin") {
        res.json({ success: false, message: "Invalid attempt." })
    } else {
        let instDta = await schoolColl.findOne({ _id: new ObjectId(instId), InstName: instName });
        res.json({ success: true, message: "Alhumdulilah", instDta });
    }
}

// Saving Result and Preformance data
export const AddResAndPrfumncDataToDb = async (req, res) => {
    try {
        console.log(req.admin);
        const { ResAndPrfrmnc } = req.body;
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { ResultAndPerformance: ResAndPrfrmnc } });
        res.json({ success: true, dataAddedOf: "Staff Tab", message: "Res & Perfumence is okay 👍😊." })
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, error: error.message });
    }
}

// Saving Staff and Student data
export const AddStaffAndStudentDataToDb = async (req, res) => {
    try {
        const { staffAndStudnt } = req.body;
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { StaffAndStudent: staffAndStudnt } });
        res.json({ success: true, message: "Staff And Student is okay 👍😊." })
    } catch (error) {
        console.error(error);
        res.status(400).json({ status: false, error: error.message });
    }
}

// Deleting the event
export const deleteTheEventFrmDb = async (req, res) => {
    try {
        let { title } = req.body;
        let instDta = await schoolColl.findOne({ _id: new ObjectId(req.admin.instId) });
        let pastEvents = instDta.eventData;
        let updatedDta = pastEvents.filter((v, i) => v.title !== title);
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { eventData: updatedDta } });
        res.json({ success: true, message: "Event Deleted successfully ✅." })
    } catch (error) {
        res.json({ success: false, message: "Something went wrong." })
    }
}

// Saving the Fee structure
export const AddFeeTabDataToDb = async (req, res) => {
    try {
        let { feeData } = req.body;
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { feeData } });
        res.json({ success: true, dataAddedOf: "Fee Tab", message: "Alhumdulilah its okay 👍😊." })
    } catch (error) {
        res.json({ success: false, dataAddedOf: "Fee Tab", message: error.message })
    }
}

// Saving the Reviews about Institute
export const AddReviewTabDataToDb = async (req, res) => {
    try {
        let Reviews = req.body.Reviews;
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { Reviews } });
        res.json({ success: true, message: "Alhumdulilah its okay ✅👍😊." });
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// Saving the New Event
export const AddNewEventToDb = async (req, res) => {
    try {
        let { eventData } = req.body;
        let instDta = await schoolColl.findOne({ _id: new ObjectId(req.admin.instId) });
        let pastEvents = instDta.eventData;
        let updatedDta = [...pastEvents, eventData];
        await schoolColl.updateOne({ _id: new ObjectId(req.admin.instId) }, { $set: { eventData: updatedDta } });
        res.json({ success: true, message: "Event Added successfully ✅." })
    } catch (error) {
        res.json({ success: false, message: "Something went wrong." })
    }
}

// Saving the Extra Activities data preformed at institute 
export const UpdateExtraActivitiesToDb = async (req, res) => {
    try {
        let { extraActivities } = req.body;

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { extraActivities } }
        );

        res.json({
            success: true,
            message: "Extra activities updated successfully ✅."
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

// Saving the institute timing
export const UpdateTimingsToDb = async (req, res) => {
    try {
        let { timings } = req.body;
        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { timings } }
        );
        res.json({
            success: true,
            message: "Timings updated successfully ✅."
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

// Saving the Facilities data of Institute
export const UpdateFacilitiesToDb = async (req, res) => {
    try {
        let { facilities } = req.body;

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { facilities } }
        );

        res.json({
            success: true,
            message: "Facilities updated successfully ✅."
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

// Saving the administration data of Institute
export const UpdateAdministrationToDb = async (req, res) => {
    try {
        let { administration } = req.body;

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { administration } }
        );

        res.json({
            success: true,
            message: "Administration updated successfully ✅."
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Something went wrong."
        });
    }
};

// Saving the Basic Info Of Institute like bannerImg etc and removing extra data
export const UpdateBasicInfoToDb = async (req, res) => {
    try {
        const { tagline, about } = req.body;

        const bannerFile = req.files?.banner?.[0];
        const aboutImgFile = req.files?.aboutImg?.[0];

        const school = await schoolColl.findOne(
            { _id: new ObjectId(req.admin.instId) },
            { projection: { bannerUrl: 1, aboutImgUrl: 1 } }
        );

        const updateData = { tagline, about };

        if (bannerFile) {
            if (school?.bannerUrl) {
                const oldBannerId = getPublicIdFromUrl(school.bannerUrl);
                await deleteFromCloudinary(oldBannerId);
            }

            const bannerRes = await uploadToCloudinary(
                bannerFile,
                "school/banners"
            );
            updateData.bannerUrl = bannerRes.secure_url;
        }

        if (aboutImgFile) {
            if (school?.aboutImgUrl) {
                const oldAboutId = getPublicIdFromUrl(school.aboutImgUrl);
                await deleteFromCloudinary(oldAboutId);
            }

            const aboutRes = await uploadToCloudinary(
                aboutImgFile,
                "school/about-images"
            );
            updateData.aboutImgUrl = aboutRes.secure_url;
        }

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: updateData }
        );

        res.json({ success: true, message: "Alhumdulilah Added" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Upload failed" });
    }
};

// Saving the Staff data data : images etc and remove old data 
export const UpdateStaffData = async (req, res) => {
    try {
        const staffFromReq = Object.values(req.body);
        const school = await schoolColl.findOne({ _id: new ObjectId(req.admin.instId) });
        const oldStaff = school.staff || [];

        const finalStaff = [];

        for (let i = 0; i < staffFromReq.length; i++) {
            const member = staffFromReq[i];
            let oldImageUrl = oldStaff[i]?.image || "";
            let imageUrl = member.image || "";

            const file = req.files?.find(f => f.fieldname.startsWith(`${i}[image]`));
            if (file) {

                const uploadResult = await uploadToCloudinary(file, "staff");
                imageUrl = uploadResult.secure_url;

                if (oldImageUrl && oldImageUrl.startsWith("http")) {
                    const public_id = getPublicIdFromUrl(oldImageUrl);
                    await cloudinary.uploader.destroy(public_id, { resource_type: "image" });
                }
            }

            finalStaff.push({
                name: member.name || "",
                description: member.description || "",
                image: imageUrl
            });
        }

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { staff: finalStaff } }
        );

        res.status(200).json({
            success: true,
            message: "Staff updated successfully"
        });

    } catch (error) {
        console.error("UpdateStaffData error:", error);
        res.status(500).json({ success: false, message: "Failed to update staff" });
    }
};

// Saving the Gallery images and remove old images 
export const UpdateGallery = async (req, res) => {
    try {
        const school = await schoolColl.findOne(
            { _id: new ObjectId(req.admin.instId) },
            { projection: { gallery: 1 } }
        );

        const oldGallery = school?.gallery || [];

        let existingImages = [];
        if (req.body.existingImages) {
            existingImages = Array.isArray(req.body.existingImages)
                ? req.body.existingImages
                : [req.body.existingImages];
        }

        const deletedImages = oldGallery.filter(
            (img) => !existingImages.includes(img)
        );

        for (const imgUrl of deletedImages) {
            const public_id = getPublicIdFromUrl(imgUrl);
            await cloudinary.uploader.destroy(public_id, {
                resource_type: "image"
            });
        }

        const uploadedUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(file, "Gallery");
                uploadedUrls.push(result.secure_url);
            }
        }

        const finalGalleryImages = [
            ...existingImages,
            ...uploadedUrls
        ];

        await schoolColl.updateOne(
            { _id: new ObjectId(req.admin.instId) },
            { $set: { gallery: finalGalleryImages } }
        );

        res.status(200).json({
            success: true,
            message: "Gallery updated successfully"
        });

    } catch (error) {
        console.error("Gallery upload error:", error);
        res.status(500).json({
            success: false,
            message: "Failed to update gallery"
        });
    }
};