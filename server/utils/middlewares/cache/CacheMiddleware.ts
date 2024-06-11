import { NextFunction, Request, Response } from "express";
import { cacheClient } from "../../data/RedisCacheClient";
import { RequestWithQuery } from "../../types/DifferentiatedRequests";

export const cacheMiddleware = (key: string) => async (_req: RequestWithQuery<{}>, res: Response, next: NextFunction) => {
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