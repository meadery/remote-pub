import { RedisClient } from "redis";
import { promisify } from "util";

const TABLE_KEY = "public-tables";

export const chatUrlPattern = "https://hangouts.google.com/(.+)";
const chatUrlRegex = new RegExp(chatUrlPattern);

export interface TableData {
    tableName: string;
    chatUrl: string;
}

export interface TableStorage {
    addNewTable(data: TableData): Promise<boolean>;
    getTables(): Promise<TableData[]>;
}

export function redisTableStorage(redisClient: RedisClient): TableStorage {
    const rpush = promisify(redisClient.rpush).bind(redisClient);
    const lrange = promisify(redisClient.lrange).bind(redisClient);

    const getTables = (): Promise<TableData[]> => {
        return lrange(TABLE_KEY, 0, -1).then(rawTables => rawTables.map(it => JSON.parse(it)));
    };

    const addNewTable = async (data: TableData): Promise<boolean> => {
        if (!data.tableName || !data.chatUrl) {
            throw "Invalid table data - must contain a tableName and a chatUrl";
        }
        if (!chatUrlRegex.test(data.chatUrl)) {
            throw "Invalid chat url - must be a google hangout link";
        }
        // @ts-ignore
        return rpush(TABLE_KEY, JSON.stringify(data)).then(tablesCreated => tablesCreated > 0);
    };

    return { addNewTable, getTables };
}
