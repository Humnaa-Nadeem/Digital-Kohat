import express from "express";
import * as SAContFun from "../Controller/SuperAdminCont.js";
import { AdminMW } from "../Middleware/AdminMW.js";
const SARoutes = express.Router(); // SA => Super Admin;

<<<<<<< HEAD
SARoutes.post("/IntializesuperAdmin", SAContFun.createInitialSuperAdmin);
SARoutes.post("/SuperAdminLogin", SAContFun.SuperAdminLogin);
SARoutes.get("/GetSuperAdminDashboardData", AdminMW, SAContFun.RetriveSuperAdminData);
SARoutes.post("/CreateEduCataAdmin", AdminMW, SAContFun.CreateEduCataAdmin);
SARoutes.post("/CreateSAManager", AdminMW, SAContFun.CreateSAManager);
SARoutes.post("/GetEduTabNewReqtsData", AdminMW, SAContFun.RetriveNewReqs);
SARoutes.post("/GetEduTabNewAdnissionsData", AdminMW, SAContFun.RetriveNewAdmissionsForSP);
SARoutes.post("/ApproveAdmissionAndForward", AdminMW, SAContFun.ApproveAdmissionAndForward);
SARoutes.post("/getInstituteRecords", AdminMW, SAContFun.getInstituteRecords);
SARoutes.post("/deleteAdmissionRequest", AdminMW, SAContFun.deleteAdmissionRequest);
SARoutes.post("/deleteAdmissionRecord", AdminMW, SAContFun.deleteAdmissionRecord);

SARoutes.post("/GetSADEduTabData", AdminMW, SAContFun.RetriveEduTabDataForSP);
SARoutes.post("/ChangeAdminVerificationState", AdminMW, SAContFun.ChangeAdminVerificationState);
SARoutes.post("/ChangeTheInstState", AdminMW, SAContFun.ChangeInstState);
SARoutes.post("/DeleteTheInst", AdminMW, SAContFun.DeleteTheInst);
SARoutes.post("/DeleteTheReq", AdminMW, SAContFun.DeleteRequest);
SARoutes.post("/ChangePaymentData", AdminMW, SAContFun.ChangePaymentPlan);
SARoutes.post("/DeleteThSAManager", AdminMW, SAContFun.DeleteThSAManager);
SARoutes.get("/GetEducationNotificationCounts", AdminMW, SAContFun.GetEducationNotificationCounts);
=======
import * as FoodSPContFun from "../Controller/FoodSuperAdminCont.js";

SARoutes.post("/IntializesuperAdmin", SPContFun.createInitialSuperAdmin);
SARoutes.post("/SuperAdminLogin", SPContFun.SuperAdminLogin);
SARoutes.get("/GetSuperAdminDashboardData", AdminMW, SPContFun.RetriveSuperAdminData);
SARoutes.post("/CreateEduCataAdmin", AdminMW, SPContFun.CreateEduCataAdmin);
SARoutes.post("/CreateFoodCataAdmin", AdminMW, FoodSPContFun.CreateFoodCataAdmin);


SARoutes.post("/CreateSAManager", AdminMW, SPContFun.CreateSAManager);
SARoutes.post("/GetSADEduTabData", AdminMW, SPContFun.RetriveNewReqs);
SARoutes.post("/GetSADFoodTabData", AdminMW, FoodSPContFun.RetriveNewFoodReqs);

SARoutes.post("/GetSchoolEduTabData", AdminMW, SPContFun.RetriveSchoolDataForSP); // SP => Super Admin;
SARoutes.post("/GetFoodTabData", AdminMW, FoodSPContFun.RetriveFoodDataForSP);

SARoutes.post("/ChangeAdminVerificationState", AdminMW, SPContFun.ChangeAdminVerificationState);
SARoutes.post("/ChangeFoodAdminVerificationState", AdminMW, FoodSPContFun.ChangeFoodAdminVerificationState);

SARoutes.post("/ChangeTheInstState", AdminMW, SPContFun.ChangeInstState);
SARoutes.post("/ChangeTheFoodInstState", AdminMW, FoodSPContFun.ChangeFoodInstState);

SARoutes.post("/DeleteTheInst", AdminMW, SPContFun.DeleteTheInst);
SARoutes.post("/DeleteTheFoodInst", AdminMW, FoodSPContFun.DeleteTheFoodInst);

SARoutes.post("/DeleteTheReq", AdminMW, SPContFun.DeleteRequest);
SARoutes.post("/DeleteTheFoodReq", AdminMW, FoodSPContFun.DeleteFoodRequest);

SARoutes.post("/ChangePaymentData", AdminMW, SPContFun.ChangePaymentPlan);


SARoutes.post("/DeleteThSAManager", AdminMW, SPContFun.DeleteThSAManager);
>>>>>>> c7b38e2d4bb20aec1c47e941ded260bb08412089

// BUSINESS MANAGEMENT ROUTES
SARoutes.post("/GetBusinessesByStatus", AdminMW, SPContFun.GetBusinessesByStatus);
SARoutes.post("/UpdateBusinessStatus", AdminMW, SPContFun.UpdateBusinessStatus);

export default SARoutes;