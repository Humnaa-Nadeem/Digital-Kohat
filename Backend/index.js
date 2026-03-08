import "dotenv/config";
import express from "express";


const app = express();
import cors from "cors";
import Routes from "./Router/Router.js";
import cookieParser from "cookie-parser";
import SACAR from "./Router/SchlAndColDshBrdRouts.js";
import SARoutes from "./Router/SuperAdminRouter.js";
import businessAuthRoutes from "./routes/business/businessAuthRoutes.js";
import businessProfileRoutes from "./routes/business/businessProfileRoutes.js";
import businessProductRoutes from './routes/business/productRoutes.js';
import businessOrderRoutes from './routes/business/orderRoutes.js';
import reviewRoutes from './routes/business/reviewRoutes.js';
import customerAuthRoutes from './routes/business/customerAuthRoutes.js';
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
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

await connectMongoose();
const db = await connectMongoClient();
await ensureSuperAdmin(db);
app.locals.db = db;
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(Routes);
app.use(SACAR);
app.use(SARoutes);
app.use("/business/auth", businessAuthRoutes);
app.use("/business/profile", businessProfileRoutes);
app.use("/business/products", businessProductRoutes);
app.use("/business/orders", businessOrderRoutes);
app.use("/business/reviews", reviewRoutes);
app.use("/customer/auth", customerAuthRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});