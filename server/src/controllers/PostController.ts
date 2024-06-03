import { NextFunction, Request, Response } from "express";
import PostService from "../services/PostService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { ApiError } from "../../utils/errors/ApiError";
import SaverService from "../services/SaverService";
import { RequestWithBody, RequestWithQuery } from "../../utils/types/DifferentiatedRequests";
import DataFindOptions from "../../utils/types/DataFindOptions";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import PgSavedPostsRepository from "../repositories/implemented/postgre/PgSavedPostsRepository";

class PostController {
    private readonly postSerivce: PostService
    private readonly saverService: SaverService

    constructor() {
        this.postSerivce = new PostService(new PgPostRepository())
        this.saverService = new SaverService(new PgSavedPostsRepository())
    }

    getPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const page = Number(req.query.page) || 1
            const take = Number(req.query.take)
            if (take < 1) {
                throw ApiError.BadRequest('Wrong TAKE value')
            }

            const maxPage = await this.postSerivce.getPagesAmount(take)
            if (page > maxPage || page < 1) {
                throw ApiError.BadRequest("Wrong PAGE value")
            }

            const posts = await this.postSerivce.getPosts({ page, take })

            return res.send({
                posts, page, maxPage
            })
        } catch(e) {
            next(e)
        }
    }
    getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const post = await this.postSerivce.getPostById(id)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    getPostByLink = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { link } = req.params
            const post = await this.postSerivce.getPostByLink(link)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    getRandomPost = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await this.postSerivce.getRandomPost()
            return res.send(post)
        } catch (e) {
            next(e)
        }
    }
    getPostsByCategoryCode = async (req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) => {
        try {
            const { code } = req.params

            const posts = await this.postSerivce.getPostsByCategoryCode(code, {
                take: Number(req.query.take) || 5,
                page: Number(req.query.page) || 1
            })
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    getPostsByAuthorship = async (req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) => {
        try {
            const { authorId } = req.params

            const posts = await this.postSerivce.getPostsByAuthorship(Number(authorId), {
                take: Number(req.query.take) || 5,
                page: Number(req.query.page) || 1
            })
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    search = async (req: RequestWithQuery<{ inputStr: string }>, res: Response, next: NextFunction) => {
        try {
            if (!req.query.inputStr) {
                throw ApiError.MissingParameters("No search parameters were given")
            }
            const searchedPosts = await this.postSerivce.search(req.query.inputStr)

            return res.send(searchedPosts)
        } catch(e) {
            next(e)
        }
    }
    create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postTitle, previewText, text, categoryId } = req.body

            const inputImage = req.file
            if (!inputImage) {
                throw ApiError.MissingParameters("Image file was not given")
            }

            const post = await this.postSerivce.create({
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
    update = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id, postTitle, previewText, text, postLink, authorId, categoryId } = req.body
            if (req.user.id !== Number(authorId)) {
                throw ApiError.Forbidden("The update can't be done because you're not the author of this article")
            }

            const inputImage = req.file

            const updatedPost = await this.postSerivce.update(id, {
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
    delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { postId } = req.body
            const post = await this.postSerivce.delete(postId)

            return res.status(HttpStatusCodes.DELETED).send(post)
        } catch(e) {
            next(e)
        }
    }

    getSavedPosts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const savedPosts = await this.saverService.getUserSavedPosts(req.user.id)
            return res.send(savedPosts)
        } catch(e) {
            next(e)
        }
    }
    savePost = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.user
            const { postId } = req.body

            const userPosts = await this.saverService.savePost(postId, user.id)
            return res.send(userPosts)
        } catch(e) {
            next(e)
        }
    }
    removeSavedPost = async (req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) => {
        try {
            const user = req.user

            const userPosts = await this.saverService.removePost(req.body.postId, user.id)
            return res.send(userPosts)
        } catch(e) {
            next(e)
        }
    }
    checkIfSaved = async (req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) => {
        try {
            const user = req.user

            const response = await this.saverService.checkIfSaved(req.body.postId, user.id)
            return res.send({ response })
        } catch(e) {
            next(e)
        }
    }
    registerView = async (req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) => {
        try {
            if (!req.user) {
                return res.send({ message: 'Not authorized' })
            }

            await this.postSerivce.registerView(req.body.postId)
            return res.status(HttpStatusCodes.UPLOADED).send({ message: 'View added successfully' })
        } catch(e) {
            next(e)
        }
    }
    checkIfExistsByTitle = async (req: RequestWithBody<{ title: string }>, res: Response, next: NextFunction) => {
        try {
            const response = await this.postSerivce.checkIfExistsByTitle(req.body.title)
            return res.send({ response })
        } catch(e) {
            next(e)
        }
    }
}

export default new PostController()