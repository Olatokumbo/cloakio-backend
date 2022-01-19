import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import { getSignedUrl, uploadFiles, deleteFiles } from "../config/s3";
import redisConnection from "../config/redis";
require("dotenv").config();

import Poster, { PosterDocument } from "../models/poster";

const posters = (_req: Request, res: Response) => {
  Poster.find((err: any, posters: any) => {
    if (!err) return res.status(200).json(posters);
  });
};

const uploads = async (req: Request, res: Response) => {
  const { title, description, category, userId, price } = req.body;
  try {
    let photos = await uploadFiles(req.files);
    let keys = await photos.map((item) => item.key);
    const newPoster = new Poster({
      title,
      description,
      category,
      userId,
      price,
      // userId: (req as any).userId,
      posterKeys: keys,
      date: new Date(),
    });

    const poster: PosterDocument = await newPoster.save();
    return res.status(200).json(poster);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const posterById = (req: Request, res: Response) => {
  const { id } = req.params;

  Poster.findById(id, async (err: CallbackError, poster: PosterDocument) => {
    if (!err) {
      const redis = await redisConnection(process.env.REDIS_URL!);

      redis.set(id, JSON.stringify(poster), "ex", 15);
      return res.status(200).json(poster);
    }
  });
};

const deletePoster = async (req, res) => {
  const { id } = req.params;
  try {
    const poster: PosterDocument | null = await Poster.findByIdAndDelete(id);
    if (poster) await deleteFiles(poster.posterKeys);

    return res.status(200).json(poster);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

const updatePoster = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const poster = await Poster.findByIdAndUpdate(
      id,
      {
        ...body,
      },
      {
        new: true,
      }
    );

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
export {
  posters,
  posterById,
  uploads,
  posterImage,
  deletePoster,
  updatePoster,
};
