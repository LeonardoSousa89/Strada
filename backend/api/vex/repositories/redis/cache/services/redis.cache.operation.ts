import { getCacheValue, setCacheValue, deleteCacheValue } from "./../redis";
import { CacheOperations } from "../../../../interface/operations";
import { connect, disconnect } from "../redis";

export default class RedisOperations implements CacheOperations {
  connection = async () => await connect();

  disconnection = async () => await disconnect();

  getCache = async (key?: any) => await getCacheValue(key);

  setCache = async (key?: any, value?: any, expiration?: any) =>
    await setCacheValue(key, value, expiration);

  deleteCache = async (key?: any) => await deleteCacheValue(key);
}
