// import { createClient } from 'redis'
// import env from '../EnvSchema'

// const cacheClient = createClient({
//     password: env.REDIS_PW,
//     socket: {
//         host: env.REDIS_SOCKET_HOST,
//         port: env.REDIS_SOCKET_PORT
//     }
// })

// async function connectToCacheClient() {
//     await cacheClient.connect()
// }

// export { cacheClient, connectToCacheClient }