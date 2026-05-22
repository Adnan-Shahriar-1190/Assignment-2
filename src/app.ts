import express from "express";
import type { Application, Request, Response } from "express";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello :)",
    author: "Adnan Shahriar",
  });
});

export default app;
