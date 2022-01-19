import { createClient } from "redis";

const redisConnection = async (url?: string) => {
  const client = url ? createClient(url as any) : createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));
  client.on("ready", () => console.log("Cache Ready"));

  await client.connect();

  return client;
};

export default redisConnection;
