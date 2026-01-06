import express from "express";
import * as SchoolAdmnCntrolrFun from "../Controller/SchoolAdminCont.js";
// SchoolAdminRoutes ----> SAR;
const SAR = express.Router();

SAR.post("/AddAdminTabData", (req, res) => {
    console.log(req.body);
    res.json({ status: true, message: "Alhumdulilah its okay 👍😊." })
})







export default SAR;