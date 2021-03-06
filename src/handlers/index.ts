import { Request, Response } from "express";
import { chatUrlPattern, TableData, TableStorage } from "../storage/tables";

interface PubConfig {
    pubName: string;
    mainRoomLink: string;
}

export async function home(req: Request, res: Response, pub: PubConfig, tables: TableStorage): Promise<any> {
    return await tables.getTables().then(tables => {
        res.render("index", {
            pageTitle: `Welcome to ${pub.pubName}`,
            pubName: pub.pubName,
            mainRoomLink: pub.mainRoomLink,
            tables: tables,
            validChatUrlRegex: chatUrlPattern
        });
    });
}

export async function newTable(req: Request, res: Response, tables: TableStorage): Promise<any> {
    const tableData: TableData = { tableName: req.body.tableName, chatUrl: req.body.chatUrl };
    return await tables
        .addNewTable(tableData)
        .then(() => res.redirect("/"))
        .catch(() => res.sendStatus(400));
}
