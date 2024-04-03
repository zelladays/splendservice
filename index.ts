import express, { Express, Request, Response, NextFunction } from "express";
import BodyParser from "body-parser";
import { parseAddConfig } from "./src";
import userRouter from "./src/routes/user.route";
import userConfigRouter from "./src/routes/userConfig.route";
import potRouter from "./src/routes/pots.route";

const app = express();
const port = parseFloat(process.env.PORT) || 3001;

app.use(BodyParser.json());
app.use(
    BodyParser.urlencoded({
        extended: true,
    })
);

app.use((err, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});

app.use("/", userRouter);
app.use("/", userConfigRouter);
app.use("/", potRouter);

app.get("/verify", (req, res) => {
    res.json({ message: "API is working" });
});

app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
