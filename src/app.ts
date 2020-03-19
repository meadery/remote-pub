import express from "express";
import { home } from "./handlers";
import * as config from "./config";

const app = express();

app.set("view engine", "squirrelly");
app.set("views", "views");

app.get("/", (req, res) => home(req, res, config));

export { app };
