import express, { Response, Request } from "express";
import mongooseConnectionDB from "./config/database";
import cors from "cors";
import User from "./routes/user";
import Poster from "./routes/poster";
import auth from "./middlewares/auth";
import redisConnection from "./config/redis";
require("dotenv").config();

const PORT: number | string = process.env.PORT || 9000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const app = express();

// Connecting to MongoDB
mongooseConnectionDB(process.env.MONGODB_URI!);

// redisConnection(process.env.REDIS_URL!, process.env.REDIS_PASSWORD!);

//Initialize Redis cache
// redisConnection(process.env.REDIS_URL!);

//Enabled cors fro all routes
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/user", User);
app.use("/poster", Poster);

app.get("/", (req: Request, res: Response) => {
  console.log(req.headers);
  res.status(200).json({
    response: "Hello from Cloakio's Official Server",
  });
});

app.get("/secret", auth, (_req: Request, res: Response) => {
  res.status(200).json({
    response: "Cloakio's Secret Stuff",
  });
});

app.get("*", (req, res) => {
  res.status(400).json({ message: "Invalid API request" });
});

app.listen(PORT, () => {
  console.log("Listening at PORT", PORT);
});
