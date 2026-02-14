import express from "express";
import * as CntrolrFun from "../Controller/Controller.js";
import * as OrderCntrolr from "../Controller/OrderController.js";

const Routes = express.Router();
// Eduction page APIs for School;
Routes.get("/getSchlCrdDta", CntrolrFun.GettingSchoolCrdDta);
Routes.post("/getSchlWholeDta", CntrolrFun.GettingServiceWholeData);
Routes.get("/getFoodCrdDta", CntrolrFun.GettingFoodCrdDta);
Routes.post("/getFoodWholeDta", CntrolrFun.GettingFoodWholeData);
Routes.post("/changeRatingData", CntrolrFun.ChangeRatingData);
Routes.post("/reportServiceLanding", CntrolrFun.ReportServiceLanding);
Routes.post("/NewEduCataServiceReq", CntrolrFun.NewEduCataServiceRequest);

// Order APIs
Routes.post("/placeOrder", OrderCntrolr.PlaceOrder);
Routes.post("/getOrders", OrderCntrolr.GetOrdersByService);
Routes.post("/updateOrderStatus", OrderCntrolr.UpdateOrderStatus);
Routes.post("/bookTable", OrderCntrolr.BookTable);

export default Routes;