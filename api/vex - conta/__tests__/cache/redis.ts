import { connect, 
         disconnect, 
         setCacheValue, 
         getCacheValue
} from "../../repositories/redis/cache/redis";

export const connection = () => connect()

export const disconnection = () => disconnect()

export const setCache = (key?:any, value?:any, expiration?:any) => setCacheValue(key, value, expiration)

export const getCache = (key?:any) => getCacheValue(key)