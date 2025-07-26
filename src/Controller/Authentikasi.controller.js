import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";


export const handleLogin = async (req, res) => {

    try {
        
    } catch (error) {
        
    }

};


export const getUser = async (req, res) => { 
  try {
    const user = await prisma.user.findMany({
      orderBy: {
        name: 'asc', // urut berdasarkan nama, dari A-Z
      },
    });

    const mapel = await prisma.mapel.findMany({
      orderBy: {
        nama_mapel: 'asc', // urut berdasarkan nama, dari A-Z
      },
    });

    const kelas = await prisma.kelas.findMany({
      orderBy: {
        nama_kelas: 'asc', // urut berdasarkan nama, dari A-Z
      },
    });

    const data = {
      user: user,
      mapel: mapel,
      kelas: kelas,
    };

    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
}
