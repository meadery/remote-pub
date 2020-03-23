import { mockRequest, mockResponse } from "../testHelpers/express";
import { createClient as createMockRedisClient } from "redis-mock";
import { home } from "./index";
import { redisTableStorage } from "../storage/tables";

describe("homePage", () => {
    test("it should load the main template with the default data", async () => {
        const req = mockRequest();
        const res = mockResponse();
        const tables = redisTableStorage(createMockRedisClient());

        await home(req, res, { pubName: "Ye Olde Teste", mainRoomLink: "some.link" }, tables);

        expect(res.render).toHaveBeenCalledWith("index", {
            mainRoomLink: "some.link",
            tables: [],
            pageTitle: "Welcome to Ye Olde Teste",
            pubName: "Ye Olde Teste"
        });
    });
});
