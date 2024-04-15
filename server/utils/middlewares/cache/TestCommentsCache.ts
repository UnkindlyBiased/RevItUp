import { NextFunction, Request, Response } from "express";
import { cacheClient } from "../../data/RedisCacheClient";

async function testCommentsCache(_req: Request, res: Response, next: NextFunction) {
    try {
        const data = await cacheClient.get('comments-test')
        if (data) {
            return res.send(JSON.parse(data))
        }
        return next()
    } catch(e) {
        next(e)
    }
}

export { testCommentsCache }