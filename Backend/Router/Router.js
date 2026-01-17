import express from "express";
import * as CntrolrFun from "../Controller/Controller.js";
const Routes = express.Router();
// Eduction page APIs for School;
Routes.get("/getSchlCrdDta", CntrolrFun.GettingSchlCrdDta);
Routes.post("/getSchlWholeDta", CntrolrFun.GettingSchlWholeDta);
Routes.post("/changeRatingData" , CntrolrFun.ChangeRatingData)

export default Routes;