import { Request, Response } from "express";

interface PubConfig {
    pubName: string;
    mainRoomLink: string;
}

export function home(req: Request, res: Response, pub: PubConfig): void {
    res.render("index", {
        pageTitle: `Welcome to ${pub.pubName}`,
        pubName: pub.pubName,
        mainRoomLink: pub.mainRoomLink
    });
}

export function newTable(req: Request, res: Response): void {
    res.json({ tableName: req.body.tableName, chatUrl: req.body.chatUrl });
}
