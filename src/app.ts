import express from "express";
import { home, newTable } from "./handlers";
import * as config from "./config";
import { createClient as createMockRedisClient } from "redis-mock";
import { createClient as createRedisClient } from "redis";
import { redisUrl } from "./config";

const app = express();

const redisClient = redisUrl ? createRedisClient({ url: redisUrl }) : createMockRedisClient();

app.set("view engine", "squirrelly");
app.set("views", "views");

app.get("/", (req, res) => home(req, res, config));

app.post("/table", express.json({ type: "*/*" }), (req, res) => newTable(req, res, redisClient));

export { app };
