import express from "express";
import { home, newTable } from "./handlers";
import * as config from "./config";
import { createClient as createMockRedisClient } from "redis-mock";
import { createClient as createRedisClient } from "redis";
import { redisUrl } from "./config";
import mustacheExpress from "mustache-express";

const app = express();

const redisClient = redisUrl ? createRedisClient({ url: redisUrl }) : createMockRedisClient();

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/../views");

app.get("/", (req, res) => home(req, res, config, redisClient));

app.post("/table", express.json({ type: "*/*" }), (req, res) => newTable(req, res, redisClient));

export { app, redisClient };
