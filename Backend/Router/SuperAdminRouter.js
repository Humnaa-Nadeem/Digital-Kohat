import express from "express";
import * as SAContFun from "../Controller/SuperAdminCont.js";
import { AdminMW } from "../Middleware/AdminMW.js";
const SARoutes = express.Router(); // SA => Super Admin;

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

export default SARoutes;