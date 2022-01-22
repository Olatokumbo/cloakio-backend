import { Request, Response, NextFunction } from "express";
import Redis from "ioredis";
require("dotenv").config();

const cache = (redis: Redis.Redis) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    redis.get(id, (error, result) => {
      if (error) {
        console.log(error);
        redis.quit();
        return next();
      }
      if (result !== null) {
        return res.json(JSON.parse(result));
      } else {
        return next();
      }
    });
  };
};

export default cache;
