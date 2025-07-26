import express from "express";
import { createJournal } from "../Controller/Jurnal.controller.js";



export const RoutesJurnal = express.Router();


RoutesJurnal.post("/create", createJournal);



