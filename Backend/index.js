import express from "express";
const app = express();
import cors from "cors";
import Routes from "./Router/Router.js";
import cookieParser from "cookie-parser";
import SACAR from "./Router/SchlAndColDshBrdRouts.js";
import SARoutes from "./Router/SuperAdminRouter.js";
import { connectMongoClient } from "./Db/mongoClient.js";
import { connectMongoose } from "./Db/mongoose.js";
import { ensureSuperAdmin } from "./HelperFun/initSuperAdmin.js";

const PORT = process.env.PORT || 3000;

// Backend (Express)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
await connectMongoose();
const db = await connectMongoClient();
await ensureSuperAdmin(db);
app.locals.db = db;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(Routes);
app.use(SACAR);
app.use(SARoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});