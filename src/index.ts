import express, { Response, Request } from "express";
import mongooseConnectionDB from "./config/database";
import cors from "cors";
import User from "./routes/user";
import auth from "./middlewares/auth";
require("dotenv").config();

const PORT: number | string = process.env.PORT || 8000;
const app = express();

// Connecting to MongoDB
mongooseConnectionDB(process.env.MONGODB_URI!);

//Enabled cors fro all routes
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/user", auth, User);

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    response: "Hello from Cloakio's Official Server",
  });
});

app.get("/secret",auth, (_req: Request, res: Response) => {
  res.status(200).json({
    response: "Cloakio's Secret Stuff",
  });
});

app.listen(PORT, () => {
  console.log("Listening at PORT", PORT);
});
