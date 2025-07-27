import express from "express";
import { getUser, handleLogin, handleRegister, Logout, Session } from "../Controller/Authentikasi.controller.js";


export const RoutesAuth = express.Router();


RoutesAuth.post("/login", handleLogin);
// RoutesAuth.post("/register", handleRegister)
RoutesAuth.post("/session", Session);
RoutesAuth.post("/logout", Logout);
RoutesAuth.get("/metadata", getUser);
RoutesAuth.get("/pegawai")




