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
    const goodChatUrl = "https://hangouts.google.com/eatmyshorts";

    it("can create tables with form post data and then display then on the home page", async () => {
        await request(app)
            .post("/table")
            .send(`tableName=test_table&chatUrl=${goodChatUrl}`);

        const res = await request(app)
            .get("/")
            .send();
        expect(res.status).toEqual(200);
        expect(res.text).toContain(`<a href='${goodChatUrl}'>test_table</a>`);
    });

    it("requires a chatUrl", async () => {
        const res = await request(app)
            .post("/table")
            .send("tableName=test_table");

        expect(res.status).toEqual(400);
    });

    it("requires a tableName", async () => {
        const res = await request(app)
            .post("/table")
            .send(`chatUrl=${goodChatUrl}`);

        expect(res.status).toEqual(400);
    });

    // TODO: More than just google hangouts
    it("validates that the provided url is a google hangout", async () => {
        const res = await request(app)
            .post("/table")
            .send(`tableName=test_table&chatUrl=http://diceapi.com`);

        expect(res.status).toEqual(400);
    });
});
