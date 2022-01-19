import { Request, Response, NextFunction } from "express";
import redisConnection from "../config/redis";
require("dotenv").config();

const cache = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const redis = await redisConnection(process.env.REDIS_URL!);

  redis.get(id, (error, result) => {
    if (error) {
      console.log(error);
      return next();
    }
    if (result !== null) {
      return res.json(JSON.parse(result));
    } else {
      return next();
    }
  });
};

export default cache;
