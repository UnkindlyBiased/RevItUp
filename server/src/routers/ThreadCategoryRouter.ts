import { Router } from "express";
import ThreadCategoryController from "../controllers/ThreadCategoryController";
import { cacheMiddleware } from "../../utils/middlewares/cache/CacheMiddleware";

const ThreadCategoryRouter = Router()

ThreadCategoryRouter.get('/', cacheMiddleware('thread-categories'), ThreadCategoryController.getThreadCategories)
ThreadCategoryRouter.get('/:code', ThreadCategoryController.getThreadCategoryByCode)

export default ThreadCategoryRouter