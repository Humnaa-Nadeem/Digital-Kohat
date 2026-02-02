import express from "express";
import * as SPContFun from "../Controller/SuperAdminCont.js";
import { AdminMW } from "../Middleware/AdminMW.js";
const SARoutes = express.Router(); // SA => Super Admin;

SARoutes.post("/IntializesuperAdmin", SPContFun.createInitialSuperAdmin);
SARoutes.post("/SuperAdminLogin", SPContFun.SuperAdminLogin);
SARoutes.get("/GetSuperAdminDashboardData", AdminMW, SPContFun.RetriveSuperAdminData);
SARoutes.post("/CreateEduCataAdmin", AdminMW, SPContFun.CreateEduCataAdmin);



SARoutes.post("/CreateSAManager", AdminMW, SPContFun.CreateSAManager);
SARoutes.post("/GetSADEduTabData", AdminMW, SPContFun.RetriveNewReqs);
SARoutes.post("/GetSchoolEduTabData", AdminMW, SPContFun.RetriveSchoolDataForSP); // SP => Super Admin;
SARoutes.post("/ChangeAdminVerificationState", AdminMW, SPContFun.ChangeAdminVerificationState);
SARoutes.post("/ChangeTheInstState", AdminMW, SPContFun.ChangeInstState);
SARoutes.post("/DeleteTheInst", AdminMW, SPContFun.DeleteTheInst);
SARoutes.post("/DeleteTheReq", AdminMW, SPContFun.DeleteRequest);
SARoutes.post("/ChangePaymentData", AdminMW, SPContFun.ChangePaymentPlan);


SARoutes.post("/DeleteThSAManager", AdminMW, SPContFun.DeleteThSAManager);

export default SARoutes;