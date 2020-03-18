import { Request, Response } from "express";
import { mainRoomLink, pubName } from "../config";

export function home(req: Request, res: Response): void {
    res.render("index", {
        pageTitle: `Welcome to ${pubName}`,
        pubName: pubName,
        mainRoomLink: mainRoomLink
    });
}
