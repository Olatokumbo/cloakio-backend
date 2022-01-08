import { Request, Response } from "express";
import { CallbackError } from "mongoose";
import Poster from "../models/poster";

const posters = (req: Request, res: Response) => {
  Poster.find((err: any, posters: any) => {
    if (!err) return res.status(200).json(posters);
  });
};

const posterById = (req: Request, res: Response) => {
  const { id } = req.params;

  Poster.findById(id, (err: CallbackError, poster) => {
    if (!err) return res.status(200).json(poster);
  });
};

export { posters, posterById };
