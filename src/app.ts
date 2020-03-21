import express from "express";
import { home, newTable } from "./handlers";
import * as config from "./config";

const app = express();

app.set("view engine", "squirrelly");
app.set("views", "views");

app.get("/", (req, res) => home(req, res, config));

app.post("/table", express.json({ type: "*/*" }), (req, res) => newTable(req, res));

export { app };
