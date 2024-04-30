import { NextFunction, Request, Response } from "express";
import { cacheClient } from "../../data/RedisCacheClient";

export const cacheMiddleware = (key: string) => async (_req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await cacheClient.get(key)
        if (data) {
            return res.send(JSON.parse(data))
        }
        return next()
    } catch(e) {
        next(e)
    }
}