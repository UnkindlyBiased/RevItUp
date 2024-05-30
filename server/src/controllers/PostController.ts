import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { ApiError } from "../../utils/errors/ApiError";
import SaverService from "../services/SaverService";
import { RequestWithBody, RequestWithQuery } from "../../utils/types/DifferentiatedRequests";
import DataFindOptions from "../../utils/types/DataFindOptions";

class PostController {
    async getPosts(req: Request, res: Response, next: NextFunction) {
        try {
            const page = Number(req.query.page) || 1
            const take = Number(req.query.take)
            if (take < 1) {
                throw ApiError.BadRequest('Wrong TAKE value')
            }

            const maxPage = await PostService.getPagesAmount(take)
            if (page > maxPage || page < 1) {
                throw ApiError.BadRequest("Wrong PAGE value")
            }

            const posts = await PostService.getPosts({ page, take })

            return res.send({
                posts, page, maxPage
            })
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
    async getPostsByCategoryCode(req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) {
        try {
            const { code } = req.params

            const posts = await PostService.getPostsByCategoryCode(code, {
                take: Number(req.query.take) || 5,
                page: Number(req.query.page) || 1
            })
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    async getPostsByAuthorship(req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) {
        try {
            const { authorId } = req.params

            const posts = await PostService.getPostsByAuthorship(Number(authorId), {
                take: Number(req.query.take) || 5,
                page: Number(req.query.page) || 1
            })
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    async search(req: RequestWithQuery<{ inputStr: string }>, res: Response, next: NextFunction) {
        try {
            if (!req.query.inputStr) {
                throw ApiError.MissingParameters("No search parameters were given")
            }
            const searchedPosts = await PostService.search(req.query.inputStr)

            return res.send(searchedPosts)
        } catch(e) {
            next(e)
        }
    }
    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const { postTitle, previewText, text, categoryId } = req.body

            const inputImage = req.file
            if (!inputImage) {
                throw ApiError.MissingParameters("Image file was not given")
            }

            const post = await PostService.create({
                postTitle,
                previewText,
                text,
                image: inputImage,
                authorId: req.user.id,
                categoryId: Number(categoryId)
            })
            res.send(post)
        } catch(e) {
            next(e)
        }
    }
    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const { id, postTitle, previewText, text, postLink, authorId, categoryId } = req.body
            if (req.user.id !== Number(authorId)) {
                throw ApiError.Forbidden("The update can't be done because you're not the author of this article")
            }

            const inputImage = req.file

            const updatedPost = await PostService.update(id, {
                postTitle,
                previewText,
                text,
                postLink,
                userId: req.user.id,
                categoryId: Number(categoryId),
                image: inputImage
            })
            return res.send(updatedPost)
        } catch(e) {
            next(e)
        }
    }
    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.body
            const post = await PostService.delete(postId)

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
    async removeSavedPost(req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) {
        try {
            const user = req.user

            const userPosts = await SaverService.removePost(req.body.postId, user.id)
            return res.send(userPosts)
        } catch(e) {
            next(e)
        }
    }
    async checkIfSaved(req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) {
        try {
            const user = req.user

            const response = await SaverService.checkIfSaved(req.body.postId, user.id)
            return res.send({ response })
        } catch(e) {
            next(e)
        }
    }
    async registerView(req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) {
        try {
            if (!req.user) {
                return res.send({ message: 'Not authorized' })
            }

            await PostService.registerView(req.body.postId)
            return res.status(HttpStatusCodes.UPLOADED).send({ message: 'View added successfully' })
        } catch(e) {
            next(e)
        }
    }
    async checkIfExistsByTitle(req: RequestWithBody<{ title: string }>, res: Response, next: NextFunction) {
        try {
            const response = await PostService.checkIfExistsByTitle(req.body.title)
            return res.send({ response })
        } catch(e) {
            next(e)
        }
    }
}

export default new PostController()