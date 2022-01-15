import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { getSignedUrl, uploadFiles, deleteFiles } from "../config/s3";

import Poster from "../models/poster";

const posters = (_req: Request, res: Response) => {
  Poster.find((err: any, posters: any) => {
    if (!err) return res.status(200).json(posters);
  });
};

const uploads = async (req: Request, res: Response) => {
  const { title, description, category, userId } = req.body;
  try {
    let photos = await uploadFiles(req.files);
    console.log(photos);
    let keys = await photos.map((item) => item.key);
    const newPoster = new Poster({
      title,
      description,
      category,
      userId,
      // userId: (req as any).userId,
      posterKeys: keys,
      date: new Date(),
    });

    const poster = await newPoster.save();
    return res.status(200).json(poster);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const posterById = (req: Request, res: Response) => {
  const { id } = req.params;

  Poster.findById(id, (err: CallbackError, poster) => {
    if (!err) return res.status(200).json(poster);
  });
};

const deletePoster = async (req, res) => {
  const { id } = req.params;
  try {
    const poster = await Poster.findByIdAndDelete(id);
    await deleteFiles(poster.posterKeys);
    return res.status(200).json(poster);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const posterImage = (req, res) => {
  const url = getSignedUrl(req.params.key);

  try {
    return res.redirect(url);
  } catch (error) {
    console.log(error);
  }
};
export { posters, posterById, uploads, posterImage, deletePoster };
