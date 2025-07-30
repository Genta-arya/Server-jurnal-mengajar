import express from "express";
import { RoutesAuth } from "./src/Routes/Auth.Routes.js";
import { RoutesJurnal } from "./src/Routes/Jurnal.Routes.js";
import { ManagementRoutes } from "./src/Routes/Management.Routes.js";
import { RoutesSetting } from "./src/Routes/Setting.Routes.js";

const router = express.Router();

router.use("/api/v1/auth", RoutesAuth);
router.use("/api/v1/journal", RoutesJurnal);
router.use("/api/v1/management", ManagementRoutes);
router.use("/api/v1/setting",RoutesSetting)
export default router;
