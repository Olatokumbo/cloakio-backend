import { Request, Response } from "express";
import User from "../models/user";

const newUser = (req: Request, res: Response) => {
  const { uid, displayName, email, photoURL, phoneNumber } = req.body;
  const newUser = new User({
    _id: uid,
    displayName,
    email,
    photoURL,
    phoneNumber,
    joined: new Date(),
  });
  newUser
    .save()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      throw new Error(err);
    });
};

export { newUser };
