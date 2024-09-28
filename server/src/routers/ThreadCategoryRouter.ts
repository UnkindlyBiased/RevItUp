import { Router } from "express";
import ThreadCategoryController from "../controllers/ThreadCategoryController";

const ThreadCategoryRouter = Router()

ThreadCategoryRouter.get('/', ThreadCategoryController.getThreadCategories)
ThreadCategoryRouter.get('/:code', ThreadCategoryController.getThreadCategoryByCode)

export default ThreadCategoryRouter