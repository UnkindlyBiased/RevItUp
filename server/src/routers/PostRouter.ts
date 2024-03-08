import { Router } from "express";
import PostController from "../controllers/PostController";

const PostRouter = Router()

PostRouter.get('/', PostController.getPosts)
PostRouter.post('/', PostController.create)

export default PostRouter