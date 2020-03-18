import { mockRequest, mockResponse } from "../testHelpers/express";
import { home } from "./index";

describe("homePage", () => {
    test("it should load the main template with the default data", async () => {
        const req = mockRequest();
        const res = mockResponse();
        await home(req, res);
        expect(res.render).toHaveBeenCalledWith("index", {
            mainRoomLink: "https://hangouts.google.com/",
            pageTitle: "Welcome to Ye Olde Default",
            pubName: "Ye Olde Default"
        });
    });
});
