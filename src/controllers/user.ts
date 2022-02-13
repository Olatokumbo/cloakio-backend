import { Request, Response } from "express";
import User from "../models/user";

const newUser = (req: Request, res: Response) => {
  const { uid, displayName, email, photoURL, phoneNumber } = req.body;
  const newUser = new User({
    _id: uid,
    displayName: displayName ?? email.split("@")[0],
    email,
    photoURL: photoURL ?? "https://via.placeholder.com/150",
    phoneNumber,
    joined: new Date(),
  });
  newUser
    .save()
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((err) => {
      return res.status(400).json({ error: err.message });
    });
};

export { newUser };
