import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";
import { DateTime } from "luxon";
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

    return res.status(201).json({ message: "Success", data: journal });
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
};

export const GetJournalByDate = async (req, res) => {
  const { date } = req.body;

  if (!date) {
    return sendError(res, "date wajib diisi", 400);
  }

  try {
    const startOfDay = DateTime.fromISO(date).startOf("day").toJSDate();
    const endOfDay = DateTime.fromISO(date).endOf("day").toJSDate();

    const findData = await prisma.jurnal.findMany({
      where: {
        tanggalMengajar: {
          gte: startOfDay,
          lte: endOfDay,
        },
      },
    });

    sendResponse(res, 200, "Success", findData);
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
};

export const getJournalById = async (req, res) => {
  const { id } = req.params;
  const { year } = req.query;

  if (!id) {
    return sendError(res, "id wajib diisi", 400);
  }
  try {
    const findData = await prisma.jurnal.findMany({
      where: {
        userId: id,
        tanggalMengajar: {
          ...(year && {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`),
          }),
        },
      },
    });
    sendResponse(res, 200, "Success", findData);
  } catch (error) {
    console.log(error);
    sendError(res, error);
  }
};

export const getJournalByIdKelas = async (req, res) => {
  const { name_kelas } = req.params;
  const { year } = req.query;
  console.log(year);

  if (!name_kelas) {
    return res.status(400).json({ message: "Nama kelas wajib diisi" });
  }

  try {
    const findData = await prisma.jurnal.findMany({
      where: {
        kelas: {
          contains: name_kelas,
        },
        ...(year && {
          tanggalMengajar: {
            gte: new Date(`${year}-01-01T00:00:00.000Z`),
            lte: new Date(`${year}-12-31T23:59:59.999Z`),
          },
        }),
      },
      include: {
        user: true,
      },
    });

    const rekap = [];

    findData.forEach((item) => {
      const namaGuru = item.user?.name || "Tidak diketahui";
      const mataPelajaran = item.mataPelajaran;
      const status = item.statusKehadiran;
      const tahun_ajaran = item.tanggalMengajar;

      const existing = rekap.find(
        (r) => r.namaGuru === namaGuru && r.mataPelajaran === mataPelajaran
      );

      if (existing) {
        existing[status] = (existing[status] || 0) + 1;
      } else {
        rekap.push({
          namaGuru,
          mataPelajaran,
          Hadir: status === "Hadir" ? 1 : 0,
          Sakit: status === "Sakit" ? 1 : 0,
          Izin: status === "Izin" ? 1 : 0,
          "Dinas Luar": status === "Dinas Luar" ? 1 : 0,
          tahun_ajaran,
        });
      }
    });

    res.status(200).json({
      message: "Success",
      data: rekap,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Terjadi kesalahan saat mengambil data" });
  }
};
