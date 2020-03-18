import { Request, Response } from "express";
import { mainRoomLink, pubName } from "../config";

export async function home(req: Request, res: Response) {
    return res.render("index", {
        pageTitle: `Welcome to ${pubName}`,
        pubName: pubName,
        mainRoomLink: mainRoomLink
    });
}
