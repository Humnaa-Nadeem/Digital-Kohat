import express from "express";
import * as CntrolrFun from "../Controller/Controller.js";
import { UserMW } from "../Middleware/UserMW.js";
import { upload } from "../Middleware/multer.js";
const Routes = express.Router();
// Eduction page APIs for School;
Routes.post("/getInstCrdDta", CntrolrFun.GettingInstCrdDta);
Routes.post("/getInstWholeDta", CntrolrFun.GettingServiceWholeData);
Routes.post("/changeRatingData", UserMW, CntrolrFun.ChangeRatingData);
Routes.post("/NewEduCataServiceReq", CntrolrFun.NewEduCataServiceRequest);
Routes.post("/NewInstAdmissionReq", upload.any(), CntrolrFun.NewInstAdmssnReqFun);

Routes.post("/register/user/request-otp", CntrolrFun.RequestRegisterOtp);
Routes.post("/register/user/verify-otp", CntrolrFun.VerifyRegisterOtp);
Routes.post("/user/login", CntrolrFun.LoginUser);
Routes.get("/user/data", UserMW, CntrolrFun.GetLoggedInUser);

export default Routes;