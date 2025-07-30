import { prisma } from "../Config/Prisma.js";
import { sendError, sendResponse } from "../Utils/Response.js";

export const getDataWeb = async (req, res) => {
  try {
    const data = await prisma.headerweb.findMany();
    sendResponse(res, 200, "Success", data);
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};

export const UpdateData = async (req, res) => {
  const { type, BannerUrl, title, tahun_ajaran } = req.body;

  console.log(req.body);

  if (!type) {
    return sendResponse(res, 400, "Field tidak boleh kosong");
  }
  try {
    if (type === "banner") {
      if (!BannerUrl) {
        return sendResponse(res, 400, "Field tidak boleh kosong");
      }
      await prisma.headerweb.updateMany({
        data: {
          Banner: BannerUrl,
        },
      });
      sendResponse(res, 200, "Success");
    } else if (type === "title") {
      if (!title) {
        return sendResponse(res, 400, "Field tidak boleh kosong");
      }
      await prisma.headerweb.updateMany({
        data: {
          msgWelcome: title,
        },
      });
      sendResponse(res, 200, "Success");
    } else if (type === "tahun_ajaran") {
      if (!tahun_ajaran) {
        return sendResponse(res, 400, "Field tidak boleh kosong");
      }
      await prisma.headerweb.updateMany({
        data: {
          tahun_ajaran: tahun_ajaran,
        },
      });
      sendResponse(res, 200, "Success");
    }
  } catch (error) {
    console.log(error);
    sendError(res, error, 500);
  }
};
