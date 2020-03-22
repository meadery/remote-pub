import { app, redisClient } from "./app";
import request from "supertest";

beforeEach(() => {
    redisClient.flushall();
});

describe("Smoke test the app", () => {
    it("hitting / should give a 200", async () => {
        const res = await request(app)
            .get("/")
            .send();
        expect(res.status).toEqual(200);
    });
});

describe("Table creation endpont", () => {
    it("can create tables and then display then on the home page", async () => {
        await request(app)
            .post("/table")
            .send({ tableName: "test table", chatUrl: "www.eatmyshorts.com" });

        const res = await request(app)
            .get("/")
            .send();
        expect(res.status).toEqual(200);
        expect(res.text).toContain("<a href='www.eatmyshorts.com'>test table</a>");
    });
});
