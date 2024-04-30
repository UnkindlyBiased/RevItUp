import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { ApiError } from "../../utils/errors/ApiError";

class PostController {
    async getPosts(_req: Request, res: Response, next: NextFunction) {
        try {
            const posts = await PostService.getPosts()
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    async getPostById(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.params
            const post = await PostService.getPostById(id)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    async getPostByLink(req: Request, res: Response, next: NextFunction) {
        try {
            const { link } = req.params
            const post = await PostService.getPostByLink(link)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    async getRandomPost(_req: Request, res: Response, next: NextFunction) {
        try {
            const post = await PostService.getRandomPost()
            return res.send(post)
        } catch (e) {
            next(e)
        }
    }
    async search(req: Request, res: Response, next: NextFunction) {
        try {
            const { inputStr } = req.query
            if (!inputStr) {
                throw ApiError.MissingParameters("No search parameters were given")
            }

            const searchedPosts = await PostService.search(inputStr.toString())

            return res.send(searchedPosts)
        } catch(e) {
            next(e)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { postTitle, previewText, text, imageLink } = req.body

            const post = await PostService.create({
                postTitle,
                previewText,
                text,
                imageLink,
                authorId: req.user.id
            })
            res.send(post)
        } catch(e) {
            next(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, postTitle, previewText, text, authorId } = req.body
            if (req.user.id !== Number(authorId)) {
                throw ApiError.Forbidden("The update can't be done because you're not the author of this article")
            }

            const updatedPost = await PostService.update(id, {
                postTitle,
                previewText,
                text
            })
            res.send(updatedPost)
        } catch(e) {
            next(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { id } = req.body
            const post = await PostService.delete(id)

            return res.status(HttpStatusCodes.DELETED).send(post)
        } catch(e) {
            next(e)
        }
    }
}

export default new PostController()