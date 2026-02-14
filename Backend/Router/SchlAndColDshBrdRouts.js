import express from "express";
import * as SACACFun from "../Controller/SchlAndColDshBrdContr.js";
// SACACFun => SCHOOL AND COLLEGE ADMIN CONTROLLER FUNCTIONS:
import { AdminMW } from "../Middleware/AdminMW.js";
import { upload } from "../Middleware/multer.js";
import { DeleteStaffImage } from "../utils/cloudinary.js";
const SACAR = express.Router();
// SACAR => SCHOOL AND COLLEGE ADMIN ROUTES:

// ==========================================
// ADMIN AUTHENATICATION AND AUTHORIZATION:
// ==========================================

SACAR.post("/AdminLogin", SACACFun.AdminLoginFun);
SACAR.post("/Logout", SACACFun.Logout);
SACAR.get("/getDashBoardDta", AdminMW, SACACFun.RetriveTheDashboardDta);
SACAR.post("/AddManager", AdminMW, SACACFun.AddManager);
SACAR.post("/switchDashBoard", AdminMW, SACACFun.switchDashBoard);
SACAR.post("/AddManager", SACACFun.AddManager);

// ==========================================
// BASIC INFO TAB DATA UPDATING ROUTES:
// ==========================================

SACAR.post("/UpdateBasicInfo", AdminMW, upload.fields([
    { name: "bannerUrl", maxCount: 1 },
    { name: "aboutImgUrl", maxCount: 1 },
    { name: "aboutImage", maxCount: 1 },
]), SACACFun.UpdateBasicInfoToDb);

// ==========================================
// ADMIN TAB DATA UPDATING ROUTES:
// ==========================================

SACAR.post("/UpdateAdministration", AdminMW, SACACFun.UpdateAdministrationToDb);
SACAR.post("/UpdateTimings", AdminMW, SACACFun.UpdateTimingsToDb);
SACAR.post("/UpdateFacilities", AdminMW, SACACFun.UpdateFacilitiesToDb);

// ==========================================
// STAFF TAB DATA UPDATING ROUTES:
// ==========================================

SACAR.post("/UpdateStaff", AdminMW, upload.any(), SACACFun.UpdateStaffData);
SACAR.post("/DeleteImage", AdminMW, DeleteStaffImage);
SACAR.post("/AddStaffAndStudntData", AdminMW, SACACFun.AddStaffAndStudentDataToDb);
SACAR.post("/AddResAndPrfumncData", AdminMW, SACACFun.AddResAndPrfumncDataToDb);

// ==========================================
// EVENT TAB DATA UPDATING ROUTES:
// ==========================================

SACAR.post("/deleteTheEvent", AdminMW, SACACFun.deleteTheEventFrmDb)
SACAR.post("/AddNewEvent", AdminMW, SACACFun.AddNewEventToDb);
SACAR.post("/UpdateExtraActivities", AdminMW, SACACFun.UpdateExtraActivitiesToDb);

// ==========================================
//FEE TAB DATA UPDATING ROUTE: 
// ==========================================

SACAR.post("/AddFeeTabData", AdminMW, SACACFun.AddFeeTabDataToDb);

// ==========================================
// REVIEWS TAB DATA UPDATING ROUTE:
// ==========================================

SACAR.post("/AddReviewTabData", AdminMW, SACACFun.AddReviewTabDataToDb);
SACAR.post("/ReplyToReview", AdminMW, SACACFun.ReplyToReview);
SACAR.post("/UpdateFoodMenu", AdminMW, SACACFun.UpdateFoodMenuToDb);
SACAR.post("/SubmitSupportTicket", AdminMW, SACACFun.SubmitSupportTicket);

// ==========================================
// GALLERY TAB DATA UPDATING ROUTE:
// ==========================================

SACAR.post("/UpdateGallery", AdminMW, upload.any(), SACACFun.UpdateGallery);

export default SACAR;