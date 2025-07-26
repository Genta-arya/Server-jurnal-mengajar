import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";

export const createJournal = async (req, res) => {
  try {
    const {
      namaGuru,
      tanggalMengajar,
      mataPelajaran,
      kelas,
      jamKe,
      statusKehadiran,
      materi,
      kegiatan,
      siswaHadir,
      siswaTidakHadir,
      buktiFoto,
      userId,
    } = req.body;

    console.log(req.body);

    if (!userId || !tanggalMengajar) {
      return sendError(res, "userId dan tanggalMengajar wajib diisi", 400);
    }

    const journal = await prisma.jurnal.create({
      data: {
        namaGuru,
        tanggalMengajar: new Date(tanggalMengajar),
        mataPelajaran,
        kelas,
        jamKe: JSON.stringify(jamKe),
        statusKehadiran,
        materi,
        kegiatan: JSON.stringify(kegiatan),
        siswaHadir: parseInt(siswaHadir),
        siswaTidakHadir: parseInt(siswaTidakHadir),
        buktiFoto,
        user: {
          connect: { id: userId },
        },
      },
    });

  return res.status(201).json({message: "Success", data: journal});
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
};
