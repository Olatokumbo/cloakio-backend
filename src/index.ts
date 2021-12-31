import express, { Response, Request } from "express";

const PORT: number | string = process.env.PORT || 8000;
const app = express();

app.get("/", (_req: Request, res: Response) => {
  res.status(200).json({
    response: "Hello from Cloakio's Official Server",
  });
});

app.listen(PORT, () => {
  console.log("Listening at PORT", PORT);
});
