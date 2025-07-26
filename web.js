import express from "express";
import { RoutesAuth } from "./src/Routes/Auth.Routes.js";
import { RoutesJurnal } from "./src/Routes/Jurnal.Routes.js";

const router = express.Router();

router.use("/api/v1/auth", RoutesAuth);
router.use("/api/v1/journal", RoutesJurnal);
export default router;
