import express from "express";
import { getUser, handleLogin } from "../Controller/Authentikasi.controller.js";


export const RoutesAuth = express.Router();


RoutesAuth.post("/login", handleLogin);
RoutesAuth.get("/metadata", getUser);




