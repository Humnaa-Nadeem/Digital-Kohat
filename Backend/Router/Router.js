import express from "express";
import * as CntrolrFun from "../Controller/Controller.js";
const Routes = express.Router();
// Eduction page APIs for School;
Routes.get("/getSchlCrdDta", CntrolrFun.GettingSchoolCrdDta);
Routes.post("/getSchlWholeDta", CntrolrFun.GettingServiceWholeData);
Routes.post("/changeRatingData", CntrolrFun.ChangeRatingData);
Routes.post("/NewEduCataServiceReq", CntrolrFun.NewEduCataServiceRequest);

export default Routes;