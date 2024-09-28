import { Router } from "express";
import ThreadController from "../controllers/ThreadController";
import authMiddleware from "../../utils/middlewares/misc/AuthMiddleware";
import threadValidation from '../../utils/middlewares/validation/ThreadValidation'
import validationResultMiddleware from '../../utils/middlewares/validation/ValidationResultMiddleware'

const ThreadRouter = Router()

ThreadRouter.get('/', ThreadController.getThreads)
ThreadRouter.get('/:link', ThreadController.getThreadByLink)
ThreadRouter.post('/', authMiddleware, threadValidation, validationResultMiddleware, ThreadController.create)
ThreadRouter.put('/', authMiddleware, threadValidation, validationResultMiddleware, ThreadController.update)
ThreadRouter.patch('/', ThreadController.registerView)
ThreadRouter.delete('/', authMiddleware, ThreadController.delete)

ThreadRouter.get('thread-categories')

export default ThreadRouter