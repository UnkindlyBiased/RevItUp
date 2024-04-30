import { createClient } from 'redis'

const cacheClient = createClient({
    url: process.env.REDIS_URL,
});

async function connectToCacheClient() {
    await cacheClient.connect()
}

export { cacheClient, connectToCacheClient }