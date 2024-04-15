import { createClient } from 'redis'

const cacheClient = createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT) || 10413,
    }
})

async function connectToCacheClient() {
    await cacheClient.connect()
}

export { cacheClient, connectToCacheClient }