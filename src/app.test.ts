import { app } from "./app";
import request from "supertest";

describe("Smoke test the app", () => {
    it("hitting / should give a 200", async () => {
        const res = await request(app)
            .get("/")
            .send();
        expect(res.status).toEqual(200);
    });

    it("hitting /table should give a 200", async () => {
        const res = await request(app)
            .post("/table")
            .send({ tableName: "test table", chatUrl: "www.eatmyshorts.com" });
        expect(res.status).toEqual(200);
        expect(res.body).toEqual({ tableName: "test table", chatUrl: "www.eatmyshorts.com" });
    });
});
