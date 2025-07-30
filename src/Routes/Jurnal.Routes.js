import express from "express";
import {
  createJournal,
  GetJournalByDate,
  getJournalById,
  getJournalByIdKelas,
} from "../Controller/Jurnal.controller.js";

export const RoutesJurnal = express.Router();

RoutesJurnal.post("/create", createJournal);
RoutesJurnal.post("/harian/data", GetJournalByDate);
RoutesJurnal.get("/data/:id", getJournalById);
RoutesJurnal.get("/data/kelas/:name_kelas" , getJournalByIdKelas);
