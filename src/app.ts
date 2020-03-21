import express from "express";
import { home, newTable } from "./handlers";
import * as config from "./config";
import { createClient as createMockRedisClient } from "redis-mock";

const app = express();

const redisClient = createMockRedisClient(); // TODO: Actual load a real redis client sometimes

app.set("view engine", "squirrelly");
app.set("views", "views");

app.get("/", (req, res) => home(req, res, config));

app.post("/table", express.json({ type: "*/*" }), (req, res) => newTable(req, res, redisClient));

export { app };
