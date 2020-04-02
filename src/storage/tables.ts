import { RedisClient } from "redis";
import { promisify } from "util";

const TABLE_KEY = "public-tables";
// 1 hour expiry time
const TABLE_EXPIRY_MILLISECONDS = 60 * 60 * 1000;

const googleHangout = `https://hangouts.google.com/(.+)`;
const whereby = `https://whereby.com/(.+)`;
const zoom = `https://([^\.]+).zoom.us/(.+)`;

export const chatUrlPattern = `(${googleHangout})|(${whereby})|(${zoom})`;
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
    const zrangebyscore = promisify(redisClient.zrangebyscore).bind(redisClient);
    const zadd = promisify(redisClient.zadd).bind(redisClient);
    const zremrangebyscore = promisify(redisClient.zremrangebyscore).bind(redisClient);

    const getTables = (): Promise<TableData[]> => {
        const now = Date.now();
        const oldestTable = now - TABLE_EXPIRY_MILLISECONDS;

        return zrangebyscore(TABLE_KEY, oldestTable, now + 1).then(rawTables => {
            // start a request to remove old tables. No real need to wait for this to complete
            zremrangebyscore(TABLE_KEY, 0, oldestTable);
            // @ts-ignore
            return rawTables.map(it => JSON.parse(it));
        });
    };

    const addNewTable = async (data: TableData): Promise<boolean> => {
        if (!data.tableName || !data.chatUrl) {
            throw "Invalid table data - must contain a tableName and a chatUrl";
        }
        if (!chatUrlRegex.test(data.chatUrl)) {
            throw "Invalid chat url - must be a google hangout, zoom or whereby link";
        }
        // Stores in a zset with the creation date as an index
        // this makes it easy for us to clear out old data
        // @ts-ignore
        return zadd(TABLE_KEY, Date.now(), JSON.stringify(data)).then(tablesCreated => tablesCreated > 0);
    };

    return { addNewTable, getTables };
}
