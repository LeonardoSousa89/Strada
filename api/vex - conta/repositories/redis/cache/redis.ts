import { client } from "../../../database/cache/redis";

export const connect = async () => await client.connect()

export const disconnect = async () => await client.disconnect()

export const setCacheValue = async (key?:any, value?:any, expiration?:any) => await client.set(key, value, {EX: expiration})

export const getCacheValue = async (key?:any) => await client.get(key)
