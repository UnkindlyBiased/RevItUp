import { createClient } from 'redis'
import { config } from 'dotenv'

config()

const cacheClient = createClient({
    password: process.env.REDIS_PW,
    socket: {
        host: process.env.REDIS_SOCKET_HOST,
        port: Number(process.env.REDIS_SOCKET_PORT) || 10413
    }
})

async function connectToCacheClient() {
    await cacheClient.connect()
}

export { cacheClient, connectToCacheClient }