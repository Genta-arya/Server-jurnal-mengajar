import { prisma } from "../Config/Prisma.js";
import { createToken } from "../Utils/CreateToken.js";
import { sendError, sendResponse } from "../Utils/Response.js";
import { DateTime } from "luxon";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const handleLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      return sendResponse(res, 400, "Field tidak boleh kosong");
    }

    const findUser = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });

    if (!findUser) {
      return sendResponse(res, 400, "Username atau password salah");
    }
    const isMatch = await bcrypt.compare(password, findUser.password);

    if (!isMatch) {
      return sendResponse(res, 400, "Username atau password salah");
    }
    const token = createToken({ id: findUser.id, role: findUser.role });

    if (findUser.token) {
      await prisma.admin.update({
        where: {
          id: findUser.id,
        },
        data: {
          status_login: true,
        },
      });
    } else {
      await prisma.admin.update({
        where: {
          id: findUser.id,
        },
        data: {
          token: token,
          status_login: true,
        },
      });
    }
    const findUserUpdate = await prisma.admin.findFirst({
      where: {
        id: findUser.id,
      },
    });

    sendResponse(res, 200, "Login berhasil", { token: findUserUpdate.token });
  } catch (error) {
    sendError(res, error);
  }
};

export const handleRegister = async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return sendResponse(res, 400, "Field tidak boleh kosong");
    }

    const findUser = await prisma.admin.findFirst({
      where: {
        username: username,
      },
    });

    if (findUser) {
      return sendResponse(res, 400, "Email sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.admin.create({
      data: {
        username: username,
        role: "admin",
        avatar: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
        password: hashedPassword,
      },
    });

    sendResponse(res, 200, "Registrasi berhasil");
  } catch (error) {
    sendError(res, error);
  }
};

export const Session = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return sendResponse(res, 409, "Silahkan login terlebih dahulu");
  }

  try {
    const findUser = await prisma.admin.findFirst({
      where: { token },
      select: {
        id: true,
        username: true,
        avatar: true,
        role: true,
        status_login: true,
        token: true,
      },
    });

    if (!findUser) {
      return sendResponse(res, 409, "Silahkan login terlebih dahulu");
    }

    // Ambil waktu saat ini di zona waktu Indonesia (WIB)
    const nowInIndonesia = DateTime.now().setZone("Asia/Jakarta").toISO(); // ISO string atau .toFormat("yyyy-MM-dd HH:mm:ss")

    return sendResponse(res, 200, "Success", {
      ...findUser,
      currentDateTime: nowInIndonesia,
    });
  } catch (error) {
    const findUsers = await prisma.admin.findFirst({
      where: { token },
      select: {
        id: true,
      },
    });

    if (!findUsers) {
      return sendResponse(res, 409, "Silahkan login terlebih dahulu");
    }

    if (error instanceof jwt.TokenExpiredError) {
      await prisma.admin.update({
        where: { id: findUsers.id },
        data: { status_login: false, token: null },
      });
      return sendResponse(res, 409, "Token telah kedaluwarsa");
    }

    if (error instanceof jwt.JsonWebTokenError) {
      await prisma.admin.update({
        where: { id: findUsers.id },
        data: { status_login: false, token: null },
      });
      return sendResponse(res, 409, "Token tidak valid atau format salah");
    }

    return sendError(res, error);
  }
};





export const Logout = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return sendResponse(res, 409, "Silahkan login terlebih dahulu");
  }
  try {
   
    const findUser = await prisma.admin.findFirst({
      where: { token },
    });
    if (!findUser) {
      return sendResponse(res, 409, "Silahkan login terlebih dahulu");
    }
    await prisma.admin.update({
      where: { id: findUser.id },
      data: { status_login : false, token: null },
    });
    sendResponse(res, 200, "Logout berhasil");
  } catch (error) {
    sendError(res, error);
  }
};
export const getUser = async (req, res) => {
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        name: "asc", // urut berdasarkan nama, dari A-Z
      },
    });

    const mapel = await prisma.mapel.findMany({
      orderBy: {
        nama_mapel: "asc", // urut berdasarkan nama, dari A-Z
      },
    });

    const kelas = await prisma.kelas.findMany({
      orderBy: {
        nama_kelas: "asc", // urut berdasarkan nama, dari A-Z
      },
    });
    const kegiatan = await prisma.kegiatan.findMany({
      orderBy: {
        nama_kegiatan: "asc", // urut berdasarkan nama, dari A-Z
      },
    })
    const web = await prisma.headerweb.findMany();

    const data = {
      web: web,
      mapel: mapel,
      kelas: kelas,
      kegiatan: kegiatan,
      user: user,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};


