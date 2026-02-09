import express from "express";
const app = express();
import cors from "cors";
import Routes from "./Router/Router.js";
import SAR from "./Router/DashBoardRouter.js";

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(Routes);
app.use(SAR);


app.listen(PORT, () => {
  console.log(`Alhumdulilah , Server is running on http://localhost:${PORT}`);
});