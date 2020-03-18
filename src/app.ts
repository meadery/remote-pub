import express from "express";
import { home } from "./handlers";

const app = express();

app.set("view engine", "squirrelly");
app.set("views", "views");

app.get("/", home);

export { app };
