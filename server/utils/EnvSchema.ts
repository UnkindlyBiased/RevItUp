import { z } from 'zod'
import { config } from 'dotenv'

config()

const envSchema = z.object({
    APP_PORT: z.number().positive(),

    PG_USERNAME: z.string(),
    PG_PASSWORD: z.string(),
    PG_PORT: z.number().positive(),

    REDIS_PW: z.string(),
    REDIS_SOCKET_HOST: z.string(),
    REDIS_SOCKET_PORT: z.number().positive(),

    FIREBASE_API_KEY: z.string(),
    FIREBASE_AUTH_DOMAIN: z.string(),
    FIREBASE_PROJECT_ID: z.string(),
    FIREBASE_STORAGE_BUCKET: z.string(),
    FIREABSE_MESSAGING_SENDER_ID: z.string(),
    FIREBASE_APP_ID: z.string(),

    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),

    SMTP_HOST: z.string(),
    SMTP_PORT: z.number(),
    SMTP_USER: z.string().email(),
    SMTP_PASSWORD: z.string(),

    CLIENT_URL: z.string()
})

const env = envSchema.parse({ 
    ...process.env,

    APP_PORT: Number(process.env.APP_PORT),
    PG_PORT: Number(process.env.PG_PORT),
    MONGO_PORT: Number(process.env.MONGO_PORT),
    REDIS_SOCKET_PORT: Number(process.env.REDIS_SOCKET_PORT),
    SMTP_PORT: Number(process.env.SMTP_PORT),
    CLIENT_URL: String(process.env.CLIENT_URL)
})

export default env