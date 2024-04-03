"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const routes_1 = require("./routes");
const app = (0, express_1.default)();
const port = parseFloat(process.env.PORT) || 3001;
app.use((0, body_parser_1.json)());
app.use((0, body_parser_1.urlencoded)({
    extended: true,
}));
app.use((err, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ message: err.message });
    return;
});
app.use("/", routes_1.userRouter);
app.use("/", routes_1.userConfigRouter);
app.use("/", routes_1.potsRouter);
app.use("/", routes_1.collectionsRouter);
app.get("/verify", (_, res) => {
    res.json({ message: "API is working" });
});
app.listen(port, "0.0.0.0", () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
