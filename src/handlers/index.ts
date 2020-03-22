import { Request, Response } from "express";
import { RedisClient } from "redis";
import { promisify } from "util";

interface PubConfig {
    pubName: string;
    mainRoomLink: string;
}

interface TableData {
    tableName: string;
    chatUrl: string;
}

const TABLE_KEY = "public-tables";

export async function home(req: Request, res: Response, pub: PubConfig, redisClient: RedisClient): Promise<any> {
    const lrange = promisify(redisClient.lrange).bind(redisClient);
    return await lrange(TABLE_KEY, 0, -1)
        .then(rawTables => rawTables.map(it => JSON.parse(it)))
        .then(tables => {
            res.render("index", {
                pageTitle: `Welcome to ${pub.pubName}`,
                pubName: pub.pubName,
                mainRoomLink: pub.mainRoomLink,
                tables: tables
            });
        });
}

export async function newTable(req: Request, res: Response, redisClient: RedisClient): Promise<any> {
    const tableData: TableData = { tableName: req.body.tableName, chatUrl: req.body.chatUrl };
    const rpush = promisify(redisClient.rpush).bind(redisClient);

    // @ts-ignore
    return await rpush(TABLE_KEY, JSON.stringify(tableData)).then((tablesCreated: number) => res.status(tablesCreated == 1 ? 200 : 500));
}
