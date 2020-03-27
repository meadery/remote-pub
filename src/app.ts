import express from "express";
import { home, newTable } from "./handlers";
import * as config from "./config";
import { createClient as createMockRedisClient } from "redis-mock";
import { createClient as createRedisClient } from "redis";
import { redisUrl } from "./config";
import mustacheExpress from "mustache-express";
import { redisTableStorage } from "./storage/tables";
import bodyParser from "body-parser";

const app = express();

const redisClient = redisUrl ? createRedisClient({ url: redisUrl }) : createMockRedisClient();

const tables = redisTableStorage(redisClient);

app.engine("mustache", mustacheExpress());
app.set("view engine", "mustache");
app.set("views", __dirname + "/../views");

app.get("/", (req, res) => home(req, res, config, tables));

app.post("/table", express.json(), bodyParser.urlencoded({ extended: true }), (req, res) => newTable(req, res, tables));

export { app, redisClient };
