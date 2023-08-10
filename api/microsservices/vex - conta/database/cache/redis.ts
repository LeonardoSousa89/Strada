import { createClient } from 'redis';

import * as dotenv from 'dotenv' 

dotenv.config()

// https://docs.redis.com/latest/rs/references/client_references/client_nodejs/
export const client = createClient({
    socket: {
        host:  process.env.PROD_REDIS_CLIENT,
        port: 6379
    }
})