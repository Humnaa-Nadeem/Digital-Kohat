import { MongoClient, ObjectId } from "mongodb";
import argon2 from "argon2";
import JWT from "jsonwebtoken";
import { deleteFromCloudinary, uploadToCloudinary } from "../utils/cloudinary.js";
import { getPublicIdFromUrl } from "../HelperFun/helperFun.js";
import cloudinary from "../Config/cloudinary.js";
import * as Schema from "../Models/Schemeas.js";
import mongoose from "mongoose";
const client = new MongoClient(process.env.DB_URL);
const db = client.db("DSCH");
const schoolColl = db.collection(process.env.S_C);
const AdmnColl = db.collection(process.env.A_C);

// ==========================================
// Verifying the Admin
// ==========================================
export const AdminLoginFun = async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await AdmnColl.findOne({ AdminEmail: email });

    // If admin not found, try to find manager inside any admin
    if (!admin) {
      admin = await AdmnColl.findOne({ "Managers.ManagerEmail": email });
      if (!admin) {
        return res.json({ success: false, message: "Invalid email or password." });
      }
    }

    const isAdminPasswordValid = await argon2.verify(
      admin.AdminPassword,
      password
    );

    if (isAdminPasswordValid) {
      const firstService = admin.Services[0];

      const token = JWT.sign(
        {
          role: "admin",
          AdmnEmail: admin.AdminEmail,
          ServiceId: firstService.ServiceId,
          ServiceName: firstService.ServiceName,
          verified: admin.Verified
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
        role: "admin",
        ShowSwitchTab: admin.Services.length > 1
      });
    }

    let matchedManager = null;

    for (const manager of admin.Managers || []) {
      const isManagerPasswordValid = await argon2.verify(
        manager.password,
        password
      );

      if (isManagerPasswordValid && manager.ManagerEmail === email) {
        matchedManager = manager;
        break;
      }
    }

    if (!matchedManager) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const token = JWT.sign(
      {
        role: "manager",
        AdmnEmail: admin.AdminEmail,
        ServiceId: matchedManager.ServiceId,
        ServiceName: matchedManager.ServiceName,
        verified: admin.Verified
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

    res.json({
      success: true,
      role: "manager",
      ShowSwitchTab: false
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong." });
  }
};

// =========================================
// ADD MANAGER
// =========================================
export const AddManager = async (req, res) => {
  try {
    const AdminEmail = req.token.AdmnEmail;
    const { ManagerEmail, password, ServiceName, ServiceType } = req.body;

    const admin = await AdmnColl.findOne({ AdminEmail });
    if (!admin) {
      return res.json({ success: false, message: "Admin not found." });
    }

    if (!admin.Verified) {
      return res.json({ success: false, message: "Admin not verified." });
    }

    // 1️⃣ Find selected service
    const selectedService = admin.Services.find(
      s => s.ServiceName === ServiceName && s.ServiceType === ServiceType
    );

    if (!selectedService) {
      return res.json({
        success: false,
        message: "Service not registered."
      });
    }

    // 2️⃣ Check if manager already assigned to this service
    const managerExists = admin.Managers?.find(
      m => m.ServiceId.toString() === selectedService.ServiceId.toString()
    );

    if (managerExists) {
      return res.json({
        success: false,
        message: "Manager already assigned to this service."
      });
    }

    // 3️⃣ Create manager object
    const managerObj = {
      ManagerEmail,
      password: await argon2.hash(password),
      ServiceId: selectedService.ServiceId,
      ServiceName,
      ServiceType,
      createdAt: new Date()
    };

    // 4️⃣ Push manager
    await AdmnColl.updateOne(
      { _id: admin._id },
      { $push: { Managers: managerObj } }
    );

    res.json({ success: true, message: "Manager created successfully." });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong." });
  }
};

// ===============================================
// Getting the Institute data according to admin:
// ===============================================
export const SERVICE_COLLECTION = {
  SCHOOL: schoolColl
};

export const RetriveTheDashboardDta = async (req, res) => {
  try {

    const { ServiceId, role, AdmnEmail } = req.token;

    const admin = await AdmnColl.findOne(
      { AdminEmail: AdmnEmail },
      { projection: { Services: 1, Verified: 1 } }
    );

    if (!admin) {
      return res.json({ success: false, message: "Unauthorized." });
    }

    const activeService = admin.Services.find(
      s => s.ServiceId.toString() === ServiceId.toString()
    );

    if (!activeService) {
      return res.json({ success: false, message: "Service not found." });
    }

    const ServiceCollection = SERVICE_COLLECTION[activeService.ServiceType];
    if (!ServiceCollection) {
      return res.json({ success: false, message: "Invalid service type." });
    }

    const ServiceDta = await ServiceCollection.findOne({
      _id: new ObjectId(ServiceId)
    });

    if (!ServiceDta) {
      return res.json({ success: false, message: "Service data not found." });
    }

    if (role === "admin") {

      if (!admin.Verified || !ServiceDta.Status) {
        return (
          res.json({
            success: false,
            message: "Service is not active."
          })
        )
      };

      if (admin.Services.length > 1) {
        const OtherServices =
          admin.Services.length > 1
            ? admin.Services.filter(
              s => s.ServiceId.toString() !== ServiceId.toString()
            )
            : [];
        return res.json({
          success: true,
          role: "Admin",
          ServiceDta,
          OtherServices
        });
      } else {
        return res.json({
          success: true,
          role: "Admin",
          ServiceDta
        });
      }
    }

    if (role === "manager") {
      return res.json({
        success: true,
        role: "Manager",
        ServiceDta
      });
    }

    res.json({ success: false, message: "Invalid role." });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong." });
  }
};

// ===============================================================================
// Saving the Basic Info Of Institute like bannerImg etc and removing extra data
// ===============================================================================
export const UpdateBasicInfoToDb = async (req, res) => {
  try {
    const { tagline, about, bannerUrl, aboutImgUrl } = req.body;
    const bannerFile = req.files?.bannerUrl?.[0];
    const aboutImgFile = req.files?.aboutImgUrl?.[0];


    // Get existing URLs from DB
    const school = await schoolColl.findOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { projection: { bannerUrl: 1, aboutImgUrl: 1 } }
    );

    const updateData = {
      tagline: tagline || school?.tagline || "",
      about: about || school?.about || ""
    };

    // Banner: either uploaded file or existing URL from frontend
    if (bannerFile) {
      if (school?.bannerUrl) {
        const oldBannerId = getPublicIdFromUrl(school.bannerUrl);
        await deleteFromCloudinary(oldBannerId);
      }
      const bannerRes = await uploadToCloudinary(bannerFile, "school/banners");
      updateData.bannerUrl = bannerRes.secure_url;
    } else if (bannerUrl) {
      updateData.bannerUrl = bannerUrl;
    } else {
      // fallback to existing DB value if nothing provided
      updateData.bannerUrl = school?.bannerUrl || "";
    }

    // About image: same logic
    if (aboutImgFile) {
      if (school?.aboutImgUrl) {
        const oldAboutId = getPublicIdFromUrl(school.aboutImgUrl);
        await deleteFromCloudinary(oldAboutId);
      }
      const aboutRes = await uploadToCloudinary(aboutImgFile, "school/about-images");
      updateData.aboutImgUrl = aboutRes.secure_url;
    } else if (aboutImgUrl) {
      updateData.aboutImgUrl = aboutImgUrl;
    } else {
      updateData.aboutImgUrl = school?.aboutImgUrl || "";
    }

    // Validate
    const tempBasicInfo = new mongoose.Document(updateData, Schema.BasicInfoSchema);
    const err = tempBasicInfo.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });

    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { $set: updateData }
    );

    res.json({ success: true, message: "Basic Info updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Upload failed" });
  }
};

// ============================================
// Saving the administration data of Institute
// ============================================
export const UpdateAdministrationToDb = async (req, res) => {
  try {
    let { administration } = req.body;
    const tempAdmin = new mongoose.Document(administration, Schema.AdministrationSchema);
    const err = tempAdmin.validateSync();
    if (err) {
      return res.json({ success: false, message: "Validation failed", errors: err.errors });
    }
    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { $set: { administration } }
    );
    res.json({ success: true, message: "Administration updated successfully ✅." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Something went wrong.", error: error.message });
  }
};

// ==========================================
// Saving the institute timing
// ==========================================
export const UpdateTimingsToDb = async (req, res) => {
  try {
    let { timings } = req.body;
    const tempTiming = new mongoose.Document(timings, Schema.TimingSchema);
    const err = tempTiming.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
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

// ==========================================
// Saving the Facilities data of Institute
// ==========================================
export const UpdateFacilitiesToDb = async (req, res) => {
  try {
    let { facilities } = req.body;
    const tempFacili = new mongoose.Document({ facilities }, Schema.FacilitiesSchema);
    const err = tempFacili.validateSync();
    if (err) {
      res.json({ success: false, message: "Invalid Data" })
    } else {
      await schoolColl.updateOne(
        { _id: new ObjectId(req.token.ServiceId) },
        { $set: { facilities } }
      );

      res.json({
        success: true,
        message: "Facilities updated successfully ✅."
      });
    }
  } catch (error) {
    res.json({
      success: false,
      message: "Something went wrong."
    });
  }
};

// ============================================================
// Saving the Staff data data : images etc and remove old data 
// ============================================================
export const UpdateStaffData = async (req, res) => {
  try {
    const staffFromReq = Object.values(req.body);
    const school = await schoolColl.findOne({ _id: new ObjectId(req.token.ServiceId) });
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

    const tempFinalStaff = new mongoose.Document({ finalStaff }, Schema.StaffSchema);
    const err = tempFinalStaff.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
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

// ==========================================
// Saving Staff and Student data
// ==========================================
export const AddStaffAndStudentDataToDb = async (req, res) => {
  try {
    const { staffAndStudnt } = req.body;
    const tempstaffAndStudnt = new mongoose.Document(staffAndStudnt, Schema.StaffAndStudentSchema);
    const err = tempstaffAndStudnt.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { StaffAndStudent: staffAndStudnt } });
    res.json({ success: true, message: "Staff And Student is okay 👍😊." })
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: false, error: error.message });
  }
}

// ==========================================
// Saving Result and Preformance data
// ==========================================
export const AddResAndPrfumncDataToDb = async (req, res) => {
  try {
    const { ResAndPrfrmnc } = req.body;
    const tempstaffAndStudnt = new mongoose.Document(ResAndPrfrmnc, Schema.ResultAndPerformanceSchema);
    const err = tempstaffAndStudnt.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { ResultAndPerformance: ResAndPrfrmnc } });
    res.json({ success: true, dataAddedOf: "Staff Tab", message: "Res & Perfumence is okay 👍😊." })
  } catch (error) {
    console.error(error);
    res.status(400).json({ status: false, error: error.message });
  }
}

// ==========================================
// Deleting the event
// ==========================================
export const deleteTheEventFrmDb = async (req, res) => {
  try {
    let { title } = req.body;
    let ServiceDta = await schoolColl.findOne({ _id: new ObjectId(req.token.ServiceId) });
    let pastEvents = ServiceDta.eventData;
    let updatedDta = pastEvents.filter((v, i) => v.title !== title);
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { eventData: updatedDta } });
    res.json({ success: true, message: "Event Deleted successfully ✅." })
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." })
  }
}

// ==========================================
// Saving the New Event
// ==========================================
export const AddNewEventToDb = async (req, res) => {
  try {
    let { eventData } = req.body;
    const tempNewEventData = new mongoose.Document(eventData, Schema.NewEventDataSchema);
    const err = tempNewEventData.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    let ServiceDta = await schoolColl.findOne({ _id: new ObjectId(req.token.ServiceId) });
    let pastEvents = ServiceDta.eventData;
    let updatedDta = pastEvents ? [...pastEvents, eventData] : eventData;
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { eventData: updatedDta } });
    res.json({ success: true, message: "Event Added successfully ✅." })
  } catch (error) {
    res.json({ success: false, message: "Something went wrong." })
  }
}

// ========================================================
// Saving the Extra Activities data preformed at institute 
// ========================================================
export const UpdateExtraActivitiesToDb = async (req, res) => {
  try {
    let { extraActivities } = req.body;
    const tempExtraActivities = new mongoose.Document({ extraActivities }, Schema.ExtraActivitiesSchema);
    const err = tempExtraActivities.validateSync();
    if (err) {
      res.json({ success: false, message: "Invalid Data" });
    }
    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
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

// ==========================================
// Saving the Fee structure
// ==========================================
export const AddFeeTabDataToDb = async (req, res) => {
  try {
    let { feeData } = req.body;
    const tempFeeData = new mongoose.Document({ feeData }, Schema.FeesSchema);
    const err = tempFeeData.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { feeData } });
    res.json({ success: true, dataAddedOf: "Fee Tab", message: "Alhumdulilah its okay 👍😊." })
  } catch (error) {
    res.json({ success: false, dataAddedOf: "Fee Tab", message: error.message })
  }
}

// ==========================================
// Saving the Reviews about Institute
// ==========================================
export const AddReviewTabDataToDb = async (req, res) => {
  try {
    let Reviews = req.body.Reviews;
    let tempReview = new mongoose.Document({ Reviews }, Schema.ReviewSchema);
    let err = tempReview.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });
    await schoolColl.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { Reviews } });
    res.json({ success: true, message: "Reviews Updated." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

// ================================================
// Saving the Gallery images and remove old images 
// ================================================
export const UpdateGallery = async (req, res) => {
  try {
    const school = await schoolColl.findOne(
      { _id: new ObjectId(req.token.ServiceId) },
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
      if (!public_id) continue;

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

    const tempGallery = new mongoose.Document({ finalGalleryImages }, Schema.GallerySchema);
    const err = tempGallery.validateSync();
    if (err) return res.json({ success: false, message: "Invalid Data" });

    await schoolColl.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
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

// =========================================
// SWITCHING ADMIN TO OTHER DASHBOARD
// =========================================
export const switchDashBoard = async (req, res) => {
  try {
    const { ServiceId } = req.body;
    const { AdmnEmail, role } = req.token;

    // ❌ Managers cannot switch services
    if (role !== "admin") {
      return res.json({ success: false, message: "Unauthorized." });
    }

    // 1️⃣ Fetch admin services
    const admin = await AdmnColl.findOne(
      { AdminEmail: AdmnEmail },
      { projection: { Services: 1 } }
    );

    if (!admin) {
      return res.json({ success: false, message: "Admin not found." });
    }

    // 2️⃣ Validate service ownership
    const selectedService = admin.Services.find(
      s => s.ServiceId.toString() === ServiceId.toString()
    );

    if (!selectedService) {
      return res.json({ success: false, message: "Invalid service selection." });
    }

    // 3️⃣ Pick correct collection
    const SERVICE_COLLECTION = {
      SCHOOL: schoolColl,
    };

    const ServiceCollection =
      SERVICE_COLLECTION[selectedService.ServiceType];

    if (!ServiceCollection) {
      return res.json({ success: false, message: "Unsupported service type." });
    }

    // 4️⃣ Fetch service data
    const ServiceDta = await ServiceCollection.findOne({
      _id: new ObjectId(ServiceId)
    });

    if (!ServiceDta) {
      return res.json({ success: false, message: "Service not found." });
    }

    // 5️⃣ Re-issue token with new active service
    const token = JWT.sign(
      {
        role: "admin",
        AdmnEmail,
        ServiceId: selectedService.ServiceId,
        ServiceName: selectedService.ServiceName,
        verified: true
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

    // 6️⃣ Other services (for switch UI)
    const OtherServices = admin.Services.filter(
      s => s.ServiceId.toString() !== ServiceId.toString()
    );

    res.json({
      success: true,
      role: "Admin",
      ServiceDta,
      OtherServices
    });

  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong." });
  }
};