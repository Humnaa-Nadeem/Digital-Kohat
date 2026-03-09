import JWT from "jsonwebtoken";
import argon2 from "argon2";
import { Admins } from "../Models/Admins.js";
import { Schools, Colleges } from "../Models/Schemeas.js";
import { getServiceModel } from "./SuperAdminCont.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { selectCollection } from "../HelperFun/helperFun.js";
import { ObjectId } from "mongodb";
import { checkPlanLimit, validatePlanFeature } from "../utils/planValidation.js";


// ✅
export const AdminLoginFun = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        success: false,
        message: "Email and password required"
      });
    }

    const admin = await Admins.findOne({
      $or: [
        { AdminEmail: email },
        { "Managers.ManagerEmail": email }
      ]
    });

    if (!admin) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    /* =====================================================
       ⭐ ADMIN LOGIN
    ===================================================== */

    if (admin.AdminEmail === email) {

      const valid = await argon2.verify(
        admin.AdminPassword,
        password
      );

      if (!valid) {
        return res.json({
          success: false,
          message: "Invalid email or password"
        });
      }

      const firstService = admin.Services?.[0];

      // Check if institute is active
      const InstituteColl = selectCollection(req, firstService?.ServiceType);
      const institute = await InstituteColl.findOne({ _id: new ObjectId(firstService?.ServiceId) });

      if (institute && institute.isActive === false) {
        return res.json({
          success: false,
          message: "Your institute account has been disabled. Please contact support."
        });
      }

      const token = JWT.sign(
        {
          role: "admin",
          AdminId: admin._id,
          AdminEmail: admin.AdminEmail,
          ServiceId: firstService?.ServiceId,
          ServiceName: firstService?.ServiceName,
          ServiceType: firstService?.ServiceType,
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
<<<<<<< HEAD
        ShowSwitchTab: admin.Services?.length > 1
=======
        ServiceType: firstService.ServiceType,
        ShowSwitchTab: admin.Services.length > 1
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
      });
    }

    /* =====================================================
       ⭐ MANAGER LOGIN (FIXED ⭐)
    ===================================================== */

    const matchedManager = admin.Managers?.find(
      m => m.ManagerEmail === email
    );

    if (!matchedManager) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Check if institute is active
    const InstituteColl = selectCollection(req, matchedManager.ServiceType);
    const institute = await InstituteColl.findOne({ _id: new ObjectId(matchedManager.ServiceId) });

    if (institute && institute.isActive === false) {
      return res.json({
        success: false,
        message: "Your institute account has been disabled. Please contact support."
      });
    }

    const validManager = await argon2.verify(
      matchedManager.password,
      password
    );

    if (!validManager) {
      return res.json({
        success: false,
        message: "Invalid email or password"
      });
    }

    const token = JWT.sign(
      {
        role: "manager",
        AdminId: admin._id,
        AdminEmail: admin.AdminEmail,
        ServiceId: matchedManager.ServiceId,
        ServiceName: matchedManager.ServiceName,
        ServiceType: matchedManager.ServiceType,
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
      role: "manager",
      ServiceType: matchedManager.ServiceType,
      ShowSwitchTab: false
    });

  } catch (error) {

    console.error("AdminLoginFun error:", error);

    return res.status(500).json({
      success: false,
      message: "Something went wrong"
    });
  }
};

// // =========================================
// // ADD MANAGER  ✅
// // =========================================
export const AddManager = async (req, res) => {
  try {

    const AdminEmail = req.token.AdminEmail; // ✅ match JWT exactly
    const { ManagerEmail, password, ServiceName, ServiceType } = req.body;

    /* =====================================================
       🔹 Basic Validation
    ===================================================== */

    if (!ManagerEmail || !password || !ServiceName || !ServiceType) {
      return res.json({
        success: false,
        message: "All fields required"
      });
    }

    const admin = await Admins.findOne({ AdminEmail });

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found."
      });
    }

    if (!admin.Verified) {
      return res.json({
        success: false,
        message: "Admin not verified."
      });
    }

    /* =====================================================
       🔹 Check Service Exists Under Admin
    ===================================================== */

    const selectedService = admin.Services.find(
      s =>
        s.ServiceName === ServiceName &&
        s.ServiceType === ServiceType
    );

    if (!selectedService) {
      return res.json({
        success: false,
        message: "Service not registered."
      });
    }

    /* =====================================================
       🔹 Prevent Duplicate Manager Email
    ===================================================== */

    const emailExists = admin.Managers?.some(
      m => m.ManagerEmail === ManagerEmail
    );

    if (emailExists) {
      return res.json({
        success: false,
        message: "Manager email already exists."
      });
    }

    /* =====================================================
       🔹 Prevent Multiple Managers for Same Service (Optional Rule)
    ===================================================== */

    const serviceManagerExists = admin.Managers?.some(
      m =>
        m.ServiceId.toString() ===
        selectedService.ServiceId.toString()
    );

    if (serviceManagerExists) {
      return res.json({
        success: false,
        message: "Manager already assigned to this service."
      });
    }

    /* =====================================================
       🔹 Create Manager
    ===================================================== */

    const hashedPassword = await argon2.hash(password);

    const managerObj = {
      ManagerEmail,
      password: hashedPassword,
      ServiceId: selectedService.ServiceId,
      ServiceName,
      ServiceType,
      createdAt: new Date()
    };

    await Admins.updateOne(
      { _id: admin._id },
      { $push: { Managers: managerObj } }
    );

    return res.json({
      success: true,
      message: "Manager created successfully."
    });

  } catch (error) {
    console.error("AddManager error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong."
    });
  }
};

<<<<<<< HEAD
// // ===============================================
// // Getting the Institute data according to admin: ✅
// // ===============================================
=======
// ===============================================
// Getting the Institute data according to admin also for food section:
// ===============================================
export const SERVICE_COLLECTION = (db) => ({
  SCHOOL: db.collection(process.env.S_C),
  COLLEGE: db.collection(process.env.S_C),
  RESTURANT: db.collection(process.env.FOOD_C || "Food"),
  Bakery: db.collection(process.env.FOOD_C || "Food"),
  Cafe: db.collection(process.env.FOOD_C || "Food"),
  "Fast Food": db.collection(process.env.FOOD_C || "Food"),
  "Fine Dining": db.collection(process.env.FOOD_C || "Food"),
  "Local Food": db.collection(process.env.FOOD_C || "Food"),
  "Street Food": db.collection(process.env.FOOD_C || "Food"),
});

>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
export const RetriveTheDashboardDta = async (req, res) => {
  try {

    const { ServiceId, role, AdminEmail, ServiceType } = req.token;

    if (!ServiceId || !role || !AdminEmail || !ServiceType) {
      return res.json({
        success: false,
        message: "Invalid token data."
      });
    }

    /* =====================================================
       🔹 Get Admin
    ===================================================== */

    const admin = await Admins.findOne(
      { AdminEmail },
      { Services: 1, Verified: 1 }
    );

    if (!admin) {
      return res.json({
        success: false,
        message: "Unauthorized."
      });
    }

    /* =====================================================
       🔹 Validate Active Service Under Admin
    ===================================================== */

    const activeService = admin.Services?.find(
      s => s.ServiceId.toString() === ServiceId.toString()
    );

<<<<<<< HEAD
    if (!activeService) {
      return res.json({
        success: false,
        message: "Service not found."
      });
    }

    /* =====================================================
       🔹 Resolve Correct Service Model
    ===================================================== */

    const ServiceCollection = resolveServiceModel(req);

=======
    const servicesCollections = SERVICE_COLLECTION(db);
    const ServiceCollection = servicesCollections[activeService.ServiceType];
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
    if (!ServiceCollection) {
      return res.json({
        success: false,
        message: "Invalid service type."
      });
    }
    /* =====================================================
    🔹 Fetch Service Data
    ===================================================== */

    const ServiceDta = await ServiceCollection.findById(ServiceId);
    if (!ServiceDta) {
      return res.json({
        success: false,
        message: "Service data not found."
      });
    }

<<<<<<< HEAD
    /* =====================================================
    🔹 Admin Role
    ===================================================== */
=======
    // Suspension logic: if report count > 70, suspend service
    if (ServiceDta.reportCount > 70 && ServiceDta.reportStatus !== "Suspended") {
      await ServiceCollection.updateOne(
        { _id: new ObjectId(ServiceId) },
        { $set: { reportStatus: "Suspended", Status: false } }
      );
      ServiceDta.reportStatus = "Suspended";
      ServiceDta.Status = false;
    }

>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
    if (role === "admin") {

      if (!admin.Verified || !ServiceDta.Status) {
        return res.json({
          success: false,
          message: "Service is not active."
        });
      }

      const OtherServices =
        admin.Services?.filter(
          s => s.ServiceId.toString() !== ServiceId.toString()
        ) || [];

      // Merge Admin Plan Info into Service Data for Frontend Compatibility
      const dashboardPayload = {
        ...ServiceDta.toObject(),
        PaymentPlan: admin.PaymentPlan || ServiceDta.PaymentPlan || "FREE",
        PlanExpiry: admin.PlanExpiry || ServiceDta.PlanExpiry,
        SubscriptionStatus: admin.SubscriptionStatus || ServiceDta.SubscriptionStatus || "Active",
        trialEndDate: admin.trialEndDate || ServiceDta.trialEndDate
      };

      return res.json({
        success: true,
        role: "admin",
        data: dashboardPayload,
        OtherServices: OtherServices.length > 0 ? OtherServices : undefined
      });
    }

    /* =====================================================
    🔹 Manager Role
    ===================================================== */
    if (role === "manager") {
      return res.json({
        success: true,
        role: "manager",
        data: ServiceDta
      });
    }

    return res.json({
      success: false,
      message: "Invalid role."
    });

  } catch (error) {
    console.error("RetriveTheDashboardDta error:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong."
    });
  }
};

/* =========================================================
   🔹 Helper – Resolve Service Model
========================================================= */

const resolveServiceModel = (req) => {
  let service = req.token?.ServiceType;
  switch (service) {
    case "SCHOOL":
      return Schools;
    case "COLLEGE":
      return Colleges;
    default:
      throw new Error("Invalid Service Type");
  }
};

/* =========================================================
   🔹 Update Basic Info ✅
========================================================= */

export const UpdateBasicInfoToDb = async (req, res) => {
  try {
<<<<<<< HEAD

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    const { tagline, about, bannerUrl, aboutImgUrl } = req.body;

=======
    const { tagline, about, bannerUrl, aboutImgUrl, location, phone, email, deliveryAvailability, timing, name, facilities } = req.body;
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
    const bannerFile = req.files?.bannerUrl?.[0];
    const aboutImgFile = req.files?.aboutImgUrl?.[0] || req.files?.aboutImage?.[0];

<<<<<<< HEAD
    // ✅ Get existing document
    const Inst = await Model.findById(ServiceId).select("bannerUrl aboutImgUrl tagline about");

    const updateData = {
      tagline: tagline || Inst?.tagline || "",
      about: about || Inst?.about || ""
    };

    /* =====================================================
       🔥 Banner Image Processing
    ===================================================== */

    if (bannerFile) {

      if (Inst?.bannerUrl) {
        const oldBannerId = getPublicIdFromUrl(Inst.bannerUrl);
        await deleteFromCloudinary(oldBannerId);
      }

      const bannerRes = await uploadToCloudinary(
        bannerFile,
        "Insts/banners"
      );

      updateData.bannerUrl = bannerRes.secure_url;

    } else if (bannerUrl) {

      updateData.bannerUrl = bannerUrl;

    } else {

      updateData.bannerUrl = Inst?.bannerUrl || "";
    }

    /* =====================================================
       🔥 About Image Processing
    ===================================================== */

    if (aboutImgFile) {

      if (Inst?.aboutImgUrl) {
        const oldAboutId = getPublicIdFromUrl(Inst.aboutImgUrl);
        await deleteFromCloudinary(oldAboutId);
      }

      const aboutRes = await uploadToCloudinary(
        aboutImgFile,
        "Insts/about-images"
      );

      updateData.aboutImgUrl = aboutRes.secure_url;

    } else if (aboutImgUrl) {

      updateData.aboutImgUrl = aboutImgUrl;

    } else {

      updateData.aboutImgUrl = Inst?.aboutImgUrl || "";
    }

    /* =====================================================
       🔥 Database Update
    ===================================================== */

    await Model.findByIdAndUpdate(
      ServiceId,
      {
        $set: {
          basicInfo: updateData
        }
      },
      {
        new: true,
        runValidators: false
      }
    );

    res.status(200).json({
      success: true,
      message: "Basic Info updated."
    });

=======
    const { ServiceId } = req.token;
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    const currentData = await ServiceCollection.findOne({ _id: new ObjectId(ServiceId) });

    const updateData = {};
    if (service.ServiceType === "SCHOOL") {
      if (tagline !== undefined) updateData.tagline = tagline;
      if (about !== undefined) updateData.about = about;
      if (location !== undefined) updateData.location = location;
      if (name !== undefined) updateData.ServiceName = name;
      if (phone !== undefined) updateData.phone = phone;
      if (email !== undefined) updateData.email = email;
      if (timing !== undefined) updateData.timing = timing;
    } else {
      // Food service structure
      if (tagline !== undefined) updateData.tagline = tagline;
      if (about !== undefined) updateData.about = about;
      if (name !== undefined) updateData.ServiceName = name;

      if (location !== undefined) updateData["quickInfo.basicProfile.location"] = location;
      if (name !== undefined) updateData["quickInfo.basicProfile.name"] = name;

      if (phone !== undefined) updateData["contact.phone"] = phone;
      if (email !== undefined) updateData["contact.email"] = email;

      if (timing !== undefined) {
        updateData["timings.opening"] = timing;
        updateData["quickInfo.timings.timing"] = timing;
      }

      if (deliveryAvailability !== undefined) updateData.deliveryAvailability = deliveryAvailability;
      if (facilities !== undefined) {
        const facilitiesArr = facilities.split(",").map(f => f.trim());
        updateData["quickInfo.facilities"] = facilitiesArr;
        updateData.facilities = facilitiesArr;
      }
    }

    // Handle Image uploads
    if (bannerFile) {
      if (currentData?.bannerUrl) {
        const oldBannerId = getPublicIdFromUrl(currentData.bannerUrl);
        await deleteFromCloudinary(oldBannerId);
      }
      const bannerRes = await uploadToCloudinary(bannerFile, "dashboard/banners");
      updateData.bannerUrl = bannerRes.secure_url;
    }

    if (aboutImgFile) {
      const fieldToUpdate = service.ServiceType === "SCHOOL" ? "aboutImgUrl" : "aboutImage";
      const oldUrl = currentData?.[fieldToUpdate];
      if (oldUrl) {
        const oldId = getPublicIdFromUrl(oldUrl);
        await deleteFromCloudinary(oldId);
      }
      const aboutRes = await uploadToCloudinary(aboutImgFile, "dashboard/about");
      updateData[fieldToUpdate] = aboutRes.secure_url;
    } else if (req.body.aboutImage) {
      updateData.aboutImage = req.body.aboutImage;
    }

    await ServiceCollection.updateOne(
      { _id: new ObjectId(ServiceId) },
      { $set: updateData }
    );

    res.json({ success: true, message: "Profile updated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

// ============================================
// Saving the administration data of Institute
// ============================================
export const UpdateAdministrationToDb = async (req, res) => {
  try {
    let { administration } = req.body;
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    await ServiceCollection.updateOne(
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
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    await ServiceCollection.updateOne(
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
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    await ServiceCollection.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { $set: { facilities } }
    );

    res.json({
      success: true,
      message: "Facilities updated successfully ✅."
    });
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Upload failed"
    });
  }
};

/* =========================================================
   🔹 Update Administration ✅
========================================================= */

export const UpdateAdministrationToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { administration: req.body.administration } }
    );

    console.log("Called");

    res.status(200).json({
      success: true,
      message: "Administration updated."
    });

  } catch (error) {

    console.log("error = ", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================================================
   🔹 Update Timings ✅
========================================================= */

export const UpdateTimingsToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    console.log(req.body);

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { timings: req.body.timings } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Timings updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================================================
   🔹 Update Facilities ✅
========================================================= */

export const UpdateFacilitiesToDb = async (req, res) => {
  try {
    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { facilities: req.body.facilities } },
    );

    res.status(200).json({
      success: true,
      message: "Facilities updated."
    });

  } catch (error) {

    console.log(error)
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================================================
   🔹 Update Fees ✅
========================================================= */

export const UpdateFeesToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;


    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { feeData: req.body.feeData } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Fees updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================================================
   🔹 Update Reviews ✅
========================================================= */

export const UpdateReviewsToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { Reviews: req.body.Reviews || [] } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Reviews updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

/* =========================================================
   🔹 Update Payment Gateways ✅
========================================================= */

export const UpdatePaymentGatewaysToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { paymentGateways: req.body.paymentGateways } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Payment gateways updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// 
export const UpdateStaffData = async (req, res) => {
  try {

    console.log("Req.body = ", req.body);

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    if (!ServiceId) {
      return res.status(400).json({
        success: false,
        message: "ServiceId missing in token"
      });
    }


    console.log("1");
    /* =====================================================
       Validate Request Staff Array
    ===================================================== */

    const staffFromReq = [];

    Object.keys(req.body).forEach(key => {
      if (!isNaN(key)) {
        staffFromReq.push(req.body[key]);
      }
    });

    if (!Array.isArray(staffFromReq) || staffFromReq.length === 0) {
      return res.status(400).json({
        success: false,
        message: "staff data missing"
      });
    }

    const Inst = await Model.findById(ServiceId).select("staff AdminId");
    const admin = await Admins.findById(Inst?.AdminId).select("PaymentPlan PlanExpiry SubscriptionStatus");

    const oldStaff = Inst?.staff || [];

    /* =====================================================
       Plan Feature & Limit Validation ⭐
    ===================================================== */
    const featureCheck = validatePlanFeature(admin || Inst, "Staff Data");
    if (!featureCheck.allowed) {
      return res.json({
        success: false,
        message: featureCheck.message
      });
    }

    const limitCheck = checkPlanLimit(admin || Inst, 'staff', oldStaff.length);
    if (!limitCheck.allowed && staffFromReq.length > oldStaff.length) {
      return res.json({
        success: false,
        message: limitCheck.message
      });
    }

    const finalStaff = [];

    console.log("2");
    /* =====================================================
       Process Staff Members
    ===================================================== */

    for (let i = 0; i < staffFromReq.length; i++) {

      const member = staffFromReq[i];

      let oldImageUrl = oldStaff[i]?.image || "";
      let imageUrl = member.image || "";

      /* ---------------- Image Upload ---------------- */

      const file = req.files?.find(
        f => f.fieldname.startsWith(`${i}[image]`)
      );

      if (file) {

        const uploadResult = await uploadToCloudinary(
          file,
          "staff"
        );

        imageUrl = uploadResult.secure_url;

        /* Delete old image from cloudinary */

        if (oldImageUrl && oldImageUrl.startsWith("http")) {
          const public_id = getPublicIdFromUrl(oldImageUrl);
          await deleteFromCloudinary(public_id);
        }
      }

      finalStaff.push({
        name: member.name || "",
        description: member.description || "",
        image: imageUrl
      });
    }

    console.log("3");
    /* =====================================================
       Update Database ⭐
    ===================================================== */

    await Model.updateOne(
      { _id: new ObjectId(ServiceId) },
      {
        $set: {
          staff: finalStaff
        }
      }
    );

    return res.status(200).json({
      success: true,
      message: "Staff updated successfully"
    });

  } catch (error) {

    console.log("UpdateStaffData error:", error);

<<<<<<< HEAD
    return res.status(500).json({
=======
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
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    await ServiceCollection.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { $set: { extraActivities } }
    );
    res.json({
      success: true,
      message: "Extra activities updated successfully ✅."
    });
  } catch (error) {
    res.json({
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
      success: false,
      message: error.message || "Failed to update staff"
    });
  }
};

<<<<<<< HEAD
// 
export const UpdateGallery = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    const Inst = await Model.findById(ServiceId)
      .select("gallery AdminId");
    const admin = await Admins.findById(Inst?.AdminId).select("PaymentPlan PlanExpiry SubscriptionStatus");

    const oldGallery = Inst?.gallery || [];

    /* ---------------- Existing Images ---------------- */
=======
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
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    await ServiceCollection.updateOne({ _id: new ObjectId(req.token.ServiceId) }, { $set: { Reviews } });
    res.json({ success: true, message: "Reviews Updated." });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
}

export const ReplyToReview = async (req, res) => {
  try {
    const { reviewId, response } = req.body;
    const { ServiceId } = req.token;
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    // Attempt to update in both potential review locations
    await ServiceCollection.updateOne(
      { _id: new ObjectId(ServiceId), "ratingData.id": reviewId },
      { $set: { "ratingData.$.response": response } }
    );

    await ServiceCollection.updateOne(
      { _id: new ObjectId(ServiceId), "detailedReviews.id": reviewId },
      { $set: { "detailedReviews.$.response": response } }
    );

    res.json({ success: true, message: "Reply saved successfully ✅." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Something went wrong while saving reply." });
  }
}

// ================================================
// Saving the Gallery images and remove old images 
// ================================================
export const UpdateGallery = async (req, res) => {
  try {
    const admin = await AdmnColl.findOne({ AdminEmail: req.token.AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === req.token.ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    const currentData = await ServiceCollection.findOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { projection: { gallery: 1 } }
    );

    const oldGallery = currentData?.gallery || [];
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

    let existingImages = [];

    if (req.body.existingImages) {
      existingImages = Array.isArray(req.body.existingImages)
        ? req.body.existingImages
        : [req.body.existingImages];
    }

    /* ---------------- Delete Removed Images ---------------- */

    const deletedImages = oldGallery.filter(
      img => !existingImages.includes(img)
    );

    for (const imgUrl of deletedImages) {

      const public_id = getPublicIdFromUrl(imgUrl);
      if (!public_id) continue;

      await deleteFromCloudinary(public_id);
    }

    /* ---------------- Upload New Images ---------------- */

    const uploadedUrls = [];

    if (req.files && req.files.length > 0) {

      for (const file of req.files) {

        const result = await uploadToCloudinary(
          file,
          "Gallery"
        );

        uploadedUrls.push(result.secure_url);
      }
    }

    const finalGalleryImages = [
      ...existingImages,
      ...uploadedUrls
    ];

<<<<<<< HEAD
    /* =====================================================
       Plan Feature & Limit Validation ⭐
    ===================================================== */
    const featureCheck = validatePlanFeature(admin || Inst, "Gallery Images");
    if (!featureCheck.allowed) {
      return res.json({
        success: false,
        message: featureCheck.message
      });
    }

    const limitCheck = checkPlanLimit(admin || Inst, 'galleryImages', oldGallery.length);
    if (!limitCheck.allowed && finalGalleryImages.length > oldGallery.length) {
      return res.json({
        success: false,
        message: limitCheck.message
      });
    }

    /* ---------------- Database Update ---------------- */

    await Model.findByIdAndUpdate(
      ServiceId,
      {
        $set: {
          gallery: finalGalleryImages
        }
      },
      {
        new: true,
        runValidators: false
      }
=======
    await ServiceCollection.updateOne(
      { _id: new ObjectId(req.token.ServiceId) },
      { $set: { gallery: finalGalleryImages } }
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089
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

//  ✅
export const AddStaffAndStudentDataToDb = async (req, res) => {
  try {

    const { ServiceId } = req.token;
    const { staffAndStudnt } = req.body;

    /* ===============================
       Basic Validation
    =============================== */

    if (!ServiceId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. ServiceId missing."
      });
    }

    if (!staffAndStudnt || typeof staffAndStudnt !== "object") {
      return res.status(400).json({
        success: false,
        message: "staffAndStudnt must be an object."
      });
    }

    /* ===============================
       Decide Collection (Dynamic)
    =============================== */

    const collection = selectCollection(req, req.token.ServiceType);

    /* ===============================
       Update Document
    =============================== */

    const result = await collection.updateOne(
      { _id: new ObjectId(ServiceId) },
      {
        $set: {
          StaffAndStudent: {
            Total_Students: staffAndStudnt.Total_Students,
            Total_Teachers: staffAndStudnt.Total_Teachers,
            Qualification: staffAndStudnt.Qualification,
            Ratio: staffAndStudnt.Ratio,
            Medium: staffAndStudnt.Medium,
            others: Array.isArray(staffAndStudnt.others)
              ? staffAndStudnt.others
              : []
          }
        }
      }
    );

    /* ===============================
       Success Response
    =============================== */

    return res.status(200).json({
      success: true,
      message: "StaffAndStudent data saved successfully 👍",
    });

  } catch (error) {

    console.log("Native Mongo Error =", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//  ✅
export const AddResAndPrfumncDataToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    console.log(req.body.ResAndPrfrmnc);

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { ResultAndPerformance: req.body.ResAndPrfrmnc } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Data updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅
export const deleteTheEventFrmDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    const { title } = req.body;

    const Inst = await Model.findById(ServiceId);

    const updatedDta = (Inst.eventData || []).filter(
      v => v.title !== title
    );

    await Model.findByIdAndUpdate(
      ServiceId,
      {
        $set: {
          eventData: updatedDta
        }
      },
      {
        new: true
      }
    );

    res.json({
      success: true,
      message: "Event Deleted successfully ✅"
    });

  } catch {
    res.json({
      success: false,
      message: "Something went wrong."
    });
  }
};

//  ✅
export const AddNewEventToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);
    const { ServiceId } = req.token;

    let Data = await Model.findById(
      ServiceId
    );

    let OldEventData = Data.eventData;
    let newEventData = [...OldEventData, req.body.eventData];

    await Model.findByIdAndUpdate(
      ServiceId,
      { $set: { eventData: newEventData } },
      { new: true, runValidators: false }
    );

    res.status(200).json({
      success: true,
      message: "Data updated."
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅
export const UpdateExtraActivitiesToDb = async (req, res) => {
  try {

    const Model = resolveServiceModel(req);

    const { ServiceId } = req.token;

    if (!ServiceId) {
      return res.status(400).json({
        success: false,
        message: "ServiceId missing in token"
      });
    }

    /* ===============================
       Validation
    =============================== */

    const activities = req.body.extraActivities;

    if (!Array.isArray(activities)) {
      return res.status(400).json({
        success: false,
        message: "extraActivities must be an array of titles"
      });
    }

    /* ===============================
       Update Document
    =============================== */

    const result = await Model.updateOne(
      {
        _id: new ObjectId(ServiceId)
      },
      {
        $set: {
          extraActivities: activities
        }
      }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Document not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Data updated."
    });

  } catch (error) {

    console.log("UpdateExtraActivitiesToDb Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅
export const GetInstituteAdmissions = async (req, res) => {
  try {

    const { instituteId } = req.body;

    /* =====================================================
       Authorization Validation
    ===================================================== */

    if (!instituteId || String(instituteId) !== String(req.token.ServiceId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Institute ID"
      });
    }

    /* =====================================================
       Collections
    ===================================================== */

    const AdmissionsRecord = selectCollection(req, "AdmissionsRecord");
    const NewAdmission = selectCollection(req, "NewAdmission");

    /* =====================================================
       Approved Admissions
    ===================================================== */

    const approvedAdmissions = await AdmissionsRecord.find(
      { instituteId: new ObjectId(instituteId) },
      {
        projection: {
          studentName: 1,
          fatherName: 1,
          phone: 1,
          email: 1,
          targetClass: 1,
          paymentScreenshot: 1,
          status: 1,
          createdAt: 1
        }
      }
    ).toArray();

    /* =====================================================
       Pending Admissions
    ===================================================== */

    const pendingAdmissions = await NewAdmission.find(
      { InstId: instituteId },
      {
        projection: {
          studentName: 1,
          fatherName: 1,
          phone: 1,
          email: 1,
          targetClass: 1,
          paymentScreenshot: 1,
          status: 1,
          createdAt: 1
        }
      }
    ).toArray();

    /* =====================================================
       Response Structure
    ===================================================== */

    return res.status(200).json({
      success: true,
      data: {
        ApprovedAdmissionscount: approvedAdmissions.length,
        ApprovedAdmissionsdata: approvedAdmissions,

        PendingAdmissionscount: pendingAdmissions.length,
        PendingAdmissionsdata: pendingAdmissions
      }
    });

  } catch (error) {

    console.error("Error in GetInstituteAdmissions:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};

//  ✅
export const switchDashBoard = async (req, res) => {
  try {

    const { ServiceId } = req.body;

    const { AdminEmail, role } = req.token;

    if (role !== "admin") {
      return res.json({
        success: false,
        message: "Unauthorized."
      });
    }

    if (!ServiceId) {
      return res.json({
        success: false,
        message: "ServiceId required."
      });
    }

    /* =====================================================
       🔥 Find Admin
    ===================================================== */

    const admin = await Admins.findOne({
      AdminEmail: AdminEmail
    }).lean();

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin not found."
      });
    }

    /* =====================================================
       🔥 Find Selected Service
    ===================================================== */

    const selectedService = admin.Services?.find(
      s => s.ServiceId.toString() === ServiceId.toString()
    );

    if (!selectedService) {
      return res.json({
        success: false,
        message: "Invalid service selection."
      });
    }

<<<<<<< HEAD
    /* =====================================================
       🔥 Dynamic Service Model Selection
    ===================================================== */

    const ServiceModel = getServiceModel(
      selectedService.ServiceType
    );
=======
    // 3️⃣ Pick correct collection from global definition (already updated to function)


    const ServiceCollection =
      SERVICE_COLLECTION(db)[selectedService.ServiceType];
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

    if (!ServiceModel) {
      return res.json({
        success: false,
        message: "Unsupported service type."
      });
    }

    const ServiceDta = await ServiceModel.findById(ServiceId).lean();

    if (!ServiceDta) {
      return res.json({
        success: false,
        message: "Service not found."
      });
    }

    /* =====================================================
       🔥 Generate New Token
    ===================================================== */

    const token = JWT.sign(
      {
        role: "admin",
        AdminEmail,
        ServiceId: selectedService.ServiceId,
        ServiceType: selectedService.ServiceType,
        ServiceName: selectedService.ServiceName,
        verified: true
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

    /* =====================================================
       🔥 Other Services List
    ===================================================== */

    const OtherServices = admin.Services.filter(
      s => s.ServiceId.toString() !== ServiceId.toString()
    );

    return res.json({
      success: true,
      role: "admin",
      ServiceType: selectedService.ServiceType,
      ServiceDta,
      OtherServices
    });


  } catch (error) {

    console.error("switchDashBoard error:", error);

    return res.json({
      success: false,
      message: "Something went wrong."
    });
  }
};
// ==========================================
// FOOD MENU MANAGEMENT
// ==========================================
export const UpdateFoodMenuToDb = async (req, res) => {
  try {
    const { menuItems } = req.body;
    const { ServiceId, AdmnEmail } = req.token;

    const admin = await AdmnColl.findOne({ AdminEmail: AdmnEmail });
    const service = admin.Services.find(s => s.ServiceId.toString() === ServiceId);
    const FoodCollection = SERVICE_COLLECTION(db)[service.ServiceType];

    if (!FoodCollection) {
      return res.json({ success: false, message: "Invalid Food Service type." });
    }

    await FoodCollection.updateOne(
      { _id: new ObjectId(ServiceId) },
      { $set: { menu: menuItems } }
    );

    res.json({ success: true, message: "Menu updated successfully ✅." });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to update menu." });
  }
};

export const Logout = (req, res) => {
  res.clearCookie("adm_token", {
    path: "/",
    sameSite: "lax",
  });
  res.json({ success: true, message: "Logged out successfully." });
};

export const SubmitSupportTicket = async (req, res) => {
  try {
    const { subject, message } = req.body;
    const { ServiceId } = req.token;

    const ticket = {
      id: new ObjectId(),
      subject,
      message,
      status: "Open",
      timestamp: new Date(),
    };

    const admin = await AdmnColl.findOne({ "Services.ServiceId": ServiceId });
    const activeService = admin.Services.find(s => s.ServiceId.toString() === ServiceId);
    const ServiceCollection = SERVICE_COLLECTION(db)[activeService.ServiceType];

    await ServiceCollection.updateOne(
      { _id: new ObjectId(ServiceId) },
      { $push: { supportTickets: ticket } }
    );

    res.json({ success: true, message: "Ticket submitted successfully.", ticket });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: "Failed to submit ticket." });
  }
};