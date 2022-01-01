import express, { Response, Request } from "express";
import mongooseConnectionDB from "./config/database";
require('dotenv').config();

const PORT: number | string = process.env.PORT || 8000;
const app = express();

// Connecting to MongoDB
mongooseConnectionDB(process.env.MONGODB_URI!);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    response: "Hello from Cloakio's Official Server",
  });
});

app.listen(PORT, () => {
  console.log("Listening at PORT", PORT);
});
