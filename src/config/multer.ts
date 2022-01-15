import { Request } from "express";
const multer = require("multer");

// import multer, { FileFilterCallback } from 'multer'

// type DestinationCallback = (error: Error | null, destination: string) => void
// type FileNameCallback = (error: Error | null, filename: string) => void

const storage = multer.memoryStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "");
  },
});

const filefilter = (req: Request, file: Express.Multer.File, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

export { storage, filefilter };
