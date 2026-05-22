import express from "express";
import type { Application, Request, Response } from "express";
import { authRoute } from "./modules/auth/auth.route";
import { issuesRoute } from "./modules/issues/issues.route";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Hello :)",
    author: "Adnan Shahriar",
  });
});

app.use('/api/auth',authRoute);
app.use('/api/issues',issuesRoute);


export default app;
