import express from "express";
import * as SPContFun from "../Controller/SuperAdminCont.js";
import { AdminMW } from "../Middleware/AdminMW.js";
const SARoutes = express.Router(); // SA => Super Admin;

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

export default SARoutes;