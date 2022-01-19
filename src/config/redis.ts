import Redis from "ioredis";


const redisConnection = async (url?: any) => {
  const redis = url ? new Redis(url): new Redis();

  redis.on("error", (err) => console.log("Redis Client Error", err));
  redis.on("ready", () => console.log("Cache Ready"));

  return redis;
};

export default redisConnection;
