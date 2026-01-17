import express from "express";
// SACFun ---> School Admin Controller Function;
import * as SACFun from "../Controller/SchoolAdminCont.js";
import { AdminMW } from "../Middleware/AdminMW.js";
import { upload } from "../Middleware/multer.js";
import { DeleteStaffImage } from "../utils/cloudinaryUpload.js";
// SchoolAdminRoutes ----> SAR;
const SAR = express.Router();
SAR.post("/AdminLogin", SACFun.AdminLoginFun);
SAR.get("/getDashBoardDta", AdminMW, SACFun.RetriveTheDashboardDta);
SAR.post("/AddResAndPrfumncData", AdminMW, SACFun.AddResAndPrfumncDataToDb);
SAR.post("/deleteTheEvent", AdminMW, SACFun.deleteTheEventFrmDb)
SAR.post("/AddNewEvent", AdminMW, SACFun.AddNewEventToDb);
SAR.post("/UpdateExtraActivities", AdminMW, SACFun.UpdateExtraActivitiesToDb);
SAR.post("/UpdateTimings", AdminMW, SACFun.UpdateTimingsToDb);
SAR.post("/UpdateFacilities", AdminMW, SACFun.UpdateFacilitiesToDb);
SAR.post("/UpdateAdministration", AdminMW, SACFun.UpdateAdministrationToDb);
SAR.post("/AddStaffAndStudntData", AdminMW, SACFun.AddStaffAndStudentDataToDb)
SAR.post("/AddReviewTabData", AdminMW, SACFun.AddReviewTabDataToDb);
SAR.post("/AddFeeTabData", AdminMW, SACFun.AddFeeTabDataToDb);
// Routes that help to add and dlt the images to and from the cloudinary:
SAR.post("/UpdateBasicInfo", AdminMW, upload.fields([
    { name: "banner", maxCount: 1 },
    { name: "aboutImg", maxCount: 1 },
]), SACFun.UpdateBasicInfoToDb);
SAR.post("/UpdateStaff", AdminMW, upload.any(), SACFun.UpdateStaffData);
SAR.post("/DeleteImage", AdminMW, DeleteStaffImage);
SAR.post("/UpdateGallery", AdminMW, upload.any(), SACFun.UpdateGallery);

export default SAR;