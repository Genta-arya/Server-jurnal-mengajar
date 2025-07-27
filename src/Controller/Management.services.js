import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";

export const CreateData = async (req, res) => {
  const { name, type } = req.body;

  if (!name || !type) {
    return sendResponse(res, 400, "Field tidak boleh kosong");
  }

  try {
    let createdData = null;

    if (type === "pegawai") {
      createdData = await prisma.user.create({
        data: {
          name: name,
        },
      });
    } else if (type === "kelas") {
      createdData = await prisma.kelas.create({
        data: {
          nama_kelas: name,
        },
      });
    } else if (type === "mapel") {
      createdData = await prisma.mapel.create({
        data: {
          nama_mapel: name,
        },
      });
    } else if (type === "kegiatan") {
      createdData = await prisma.kegiatan.create({
        data: {
          nama_kegiatan: name,
        },
      });
    }

    if (createdData) {
      return sendResponse(res, 200, "Success", createdData); // ⬅️ kirim data
    } else {
      return sendResponse(res, 400, "Tipe tidak dikenali");
    }
  } catch (error) {
    console.log(error);
    return sendError(res, error, 500);
  }
};

export const DeleteData = async (req, res) => {
  const { id, type } = req.body;

  console.log(req.body);

  if (!id || !type) {
    return sendResponse(res, 400, "ID dan type tidak boleh kosong");
  }

  try {
    let deletedData = null;

    if (type === "pegawai") {
      deletedData = await prisma.user.delete({
        where: { id },
      });
    } else if (type === "kelas") {
      deletedData = await prisma.kelas.delete({
        where: { id },
      });
    } else if (type === "mapel") {
      deletedData = await prisma.mapel.delete({
        where: { id },
      });
    } else if (type === "kegiatan") {
      deletedData = await prisma.kegiatan.delete({
        where: { id },
      });
    } else {
      return sendResponse(res, 400, "Tipe tidak dikenali");
    }

    return sendResponse(res, 200, "Berhasil menghapus data", deletedData);
  } catch (error) {
    console.log(error);
    return sendError(res, error, 500);
  }
};

export const UpdateData = async (req, res) => {
  const { id, name, type } = req.body;

  if (!id || !name || !type) {
    return sendResponse(res, 400, "Field tidak boleh kosong");
  }
  try {
    // kategori kan
    if (type === "pegawai") {
      // checkId dlu
      const findUser = await prisma.user.findFirst({
        where: {
          id: id,
        },
      });

      if (!findUser) {
        return sendResponse(res, 400, "Pegawai tidak ditemukan");
      }
      await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: name,
        },
      });
      sendResponse(res, 200, "Success");
    } else if (type === "kelas") {
      // checkId dlu
      const findKelas = await prisma.kelas.findFirst({
        where: {
          id: id,
        },
      });

      if (!findKelas) {
        return sendResponse(res, 400, "Kelas tidak ditemukan");
      }
      await prisma.kelas.update({
        where: {
          id: id,
        },
        data: {
          nama_kelas: name,
        },
      });
      sendResponse(res, 200, "Success");
    } else if (type === "mapel") {
      // checkId dlu
      const findMapel = await prisma.mapel.findFirst({
        where: {
          id: id,
        },
      });

      if (!findMapel) {
        return sendResponse(res, 400, "Mata pelajaran tidak ditemukan");
      }
      await prisma.mapel.update({
        where: {
          id: id,
        },
        data: {
          nama_mapel: name,
        },
      });
      sendResponse(res, 200, "Success");
    } else if (type === "kegiatan") {
      // checkId dlu
      const findKegiatan = await prisma.kegiatan.findFirst({
        where: {
          id: id,
        },
      });

      if (!findKegiatan) {
        return sendResponse(res, 400, "Kegiatan tidak ditemukan");
      }
      await prisma.kegiatan.update({
        where: {
          id: id,
        },
        data: {
          nama_kegiatan: name,
        },
      });
      sendResponse(res, 200, "Success");
    }
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};

export const getKelas = async (req, res) => {
  try {
    const datas = await prisma.kelas.findMany({
      orderBy: {
        nama_kelas: "asc",
      },
    });

    const data = {
      kelas: datas,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};

export const getPegawai = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        name: "asc",
      },
    });

    const data = {
      user: user,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};
export const getMapel = async (req, res) => {
  try {
    const mapel = await prisma.mapel.findMany({
      orderBy: {
        nama_mapel: "asc",
      },
    });

    const data = {
      mapel: mapel,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};

export const getKegiatan = async (req, res) => {
  try {
    const kegiatan = await prisma.kegiatan.findMany({
      orderBy: {
        nama_kegiatan: "asc",
      },
    });

    const data = {
      kegiatan: kegiatan,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};
