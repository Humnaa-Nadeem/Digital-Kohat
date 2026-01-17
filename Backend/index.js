import express from "express";
const app = express();
import cors from "cors";
import Routes from "./Router/Router.js";
import SAR from "./Router/DashBoardRouter.js";
import cookieParser from "cookie-parser";

const PORT = process.env.PORT || 3000;

// Backend (Express)
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(Routes);
app.use(SAR);


app.listen(PORT, () => {
  console.log(`Alhumdulilah , Server is running on http://localhost:${PORT}`);
});