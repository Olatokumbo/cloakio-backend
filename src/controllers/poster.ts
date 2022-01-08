import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { getFileStream, uploadFiles } from "../config/s3";

import Poster from "../models/poster";

const posters = (req: Request, res: Response) => {
  Poster.find((err: any, posters: any) => {
    if (!err) return res.status(200).json(posters);
  });
};

const uploads = async (req: Request, res: Response) => {
  const { title, description, category, userId } = req.body;
  try {
    let photos = await uploadFiles(req.files);
    let keys = await photos.map((item) => item.key);
    const newPoster = new Poster({
      title,
      description,
      category,
      userId,
      // userId: (req as any).userId,
      posterURLs: keys,
      date: new Date(),
    });

    const poster = await newPoster.save();
    return res.status(200).json(poster);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const posterById = (req: Request, res: Response) => {
  const { id } = req.params;

  Poster.findById(id, (err: CallbackError, poster) => {
    if (!err) return res.status(200).json(poster);
  });
};

const posterImage = (req, res) => {
  try {
    const readStream = getFileStream(req.params.key);
    readStream.pipe(res);
  } catch (error) {
    console.log(error);
  }
};
export { posters, posterById, uploads, posterImage };
