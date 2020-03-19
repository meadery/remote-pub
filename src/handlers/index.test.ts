import { mockRequest, mockResponse } from "../testHelpers/express";
import { home } from "./index";

describe("homePage", () => {
    test("it should load the main template with the default data", async () => {
        const req = mockRequest();
        const res = mockResponse();

        home(req, res, { pubName: "Ye Olde Teste", mainRoomLink: "some.link" });

        expect(res.render).toHaveBeenCalledWith("index", {
            mainRoomLink: "some.link",
            pageTitle: "Welcome to Ye Olde Teste",
            pubName: "Ye Olde Teste"
        });
    });
});
