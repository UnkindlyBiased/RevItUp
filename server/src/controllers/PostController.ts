import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { ApiError } from "../../utils/errors/ApiError";
import SaverService from "../services/SaverService";

class PostController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const { take, skip } = req.query;
            const posts = await PostService.getPosts({ 
                take: Number(take) | 0,
                skip: Number(skip) | 0
            });
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
    async getPostsByCategoryCode(req: Request, res: Response, next: NextFunction) {
        try {
            const { code } = req.params
            const { take, skip } = req.query

            const posts = await PostService.getPostsByCategoryCode(code, {
                take: Number(take) | 0,
                skip: Number(skip) | 0
            })
            return res.send(posts)
        } catch(e) {
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

    async getSavedPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const savedPosts = await SaverService.getUserSavedPosts(req.user.id)
            return res.send(savedPosts)
        } catch(e) {
            next(e)
        }
    }
    async savePost(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const { postId } = req.body

            const userPosts = await SaverService.savePost(postId, user.id)
            return res.send(userPosts)
        } catch(e) {
            next(e)
        }
    }
    async removePost(req: Request, res: Response, next: NextFunction) {
        try {
            const user = req.user
            const { postId } = req.body

            const userPosts = await SaverService.removePost(postId, user.id)
            return res.send(userPosts)
        } catch(e) {
            next(e)
        }
    }
}

export default new PostController()