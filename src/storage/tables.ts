import { RedisClient } from "redis";
import { promisify } from "util";

const TABLE_KEY = "public-tables";

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
        // @ts-ignore
        return rpush(TABLE_KEY, JSON.stringify(data)).then(tablesCreated => tablesCreated > 0);
    };

    return { addNewTable, getTables };
}
