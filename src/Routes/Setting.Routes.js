import express from "express";
import { getDataWeb, UpdateData } from "../Controller/Setting.controller.js";

export const RoutesSetting = express.Router();

RoutesSetting.get("/data", getDataWeb);
RoutesSetting.post("/update/data", UpdateData);
