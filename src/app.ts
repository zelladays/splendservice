import express, { Request, Response, NextFunction } from "express";
import { json, urlencoded } from "body-parser";
import {
  userRouter,
  userConfigRouter,
  potsRouter,
  collectionsRouter,
  profileRouter,
  authRouter,
} from "./routes";
import cookieParser from "cookie-parser";
import cors from "cors";
import { userAuthenticationMiddleware } from "./middlewares";

const app = express();
const port = parseFloat(process.env.PORT as string) || 3001;

app.use(json());
app.use(
  urlencoded({
    extended: true,
  })
);
app.use(cors({ credentials: true, origin: process.env.APP_URL }));

app.use(cookieParser());

app.use((err, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.use("/", authRouter);

app.use(userAuthenticationMiddleware);
app.use("/", userRouter);
app.use("/", userConfigRouter);
app.use("/", potsRouter);
app.use("/", collectionsRouter);
app.use("/", profileRouter);

app.get("/verify", (_, res) => {
  res.json({ message: "API is working" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
