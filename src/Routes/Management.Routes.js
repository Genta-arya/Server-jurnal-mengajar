import express from "express";
import {
  CreateData,
  DeleteData,
  getKegiatan,
  getKelas,
  getMapel,
  getPegawai,
  UpdateData,
} from "../Controller/Management.services.js";

export const ManagementRoutes = express.Router();

ManagementRoutes.get("/pegawai", getPegawai);
ManagementRoutes.get("/kelas", getKelas);
ManagementRoutes.get("/mapel", getMapel);
ManagementRoutes.get("/kegiatan", getKegiatan);
ManagementRoutes.put("/update/data", UpdateData);
ManagementRoutes.post("/create/data", CreateData);
ManagementRoutes.post("/delete/data", DeleteData);
