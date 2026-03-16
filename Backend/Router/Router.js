import express from "express";
import * as CntrolrFun from "../Controller/Controller.js";
import { UserMW } from "../Middleware/UserMW.js";
import { upload } from "../Middleware/multer.js";
import * as OrderCntrolr from "../Controller/OrderController.js";

const Routes = express.Router();

// Eduction page APIs for School;
Routes.get("/getSchlCrdDta", CntrolrFun.GettingSchoolCrdDta);
Routes.post("/getSchlWholeDta", CntrolrFun.GettingServiceWholeData);

// Food page APIs;
Routes.get("/getFoodCrdDta", CntrolrFun.GettingFoodCrdDta);
Routes.post("/getFoodWholeDta", CntrolrFun.GettingFoodWholeData);

// Common APIs;
Routes.post("/changeRatingData", UserMW, CntrolrFun.ChangeRatingData);
Routes.post("/reportServiceLanding", CntrolrFun.ReportServiceLanding);

Routes.post("/NewEduCataServiceReq", CntrolrFun.NewEduCataServiceRequest);
Routes.post("/NewInstAdmissionReq", upload.any(), CntrolrFun.NewInstAdmssnReqFun);

Routes.post("/register/user/request-otp", CntrolrFun.RequestRegisterOtp);
Routes.post("/register/user/verify-otp", CntrolrFun.VerifyRegisterOtp);
Routes.post("/user/login", CntrolrFun.LoginUser);
Routes.get("/user/data", UserMW, CntrolrFun.GetLoggedInUser);

// Order APIs
Routes.post("/placeOrder", OrderCntrolr.PlaceOrder);
Routes.post("/getOrders", OrderCntrolr.GetOrdersByService);
Routes.post("/updateOrderStatus", OrderCntrolr.UpdateOrderStatus);
Routes.post("/bookTable", OrderCntrolr.BookTable);

export default Routes;