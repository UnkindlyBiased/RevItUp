import { NextFunction, Request, Response } from "express";
import { ILike } from "typeorm";

import PostService from "../services/PostService";
import { HttpStatusCodes } from "../../utils/enums/HttpStatusCodes";
import { ApiError } from "../../utils/errors/ApiError";
import SaverService from "../services/SaverService";
import { RequestWithBody, RequestWithQuery } from "../../utils/types/DifferentiatedRequests";
import DataFindOptions from "../../utils/types/DataFindOptions";
import PgPostRepository from "../repositories/implemented/postgre/PgPostRepository";
import PgSavedPostsRepository from "../repositories/implemented/postgre/PgSavedPostsRepository";
import { PostInputDto } from "../models/dto/posts/PostInputDto";
import PostUpdateDto from "../models/dto/posts/PostUpdateDto";

class PostController {
    private readonly postService: PostService
    private readonly saverService: SaverService

    constructor() {
        this.postService = new PostService(new PgPostRepository())
        this.saverService = new SaverService(new PgSavedPostsRepository())
    }

    getPosts = async (req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) => {
        try {
            if (req.query.take < 1) {
                throw ApiError.BadRequest('Wrong TAKE value')
            }

            const maxPage = await this.postService.getPagesAmount(req.query.take)
            const posts = await this.postService.getPosts({
                page: req.query.page || 1,
                take: req.query.take,
            })

            return res.send({
                posts, page: Number(req.query.page), maxPage
            })
        } catch(e) {
            next(e)
        }
    }
    getPostById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params
            const post = await this.postService.getPostById(id)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    getPostByLink = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { link } = req.params
            const post = await this.postService.getPostByLink(link)

            return res.send(post)
        } catch(e) {
            next(e)
        }
    }
    getRandomPost = async (_req: Request, res: Response, next: NextFunction) => {
        try {
            const post = await this.postService.getRandomPost()
            return res.send(post)
        } catch (e) {
            next(e)
        }
    }
    getPostsByCategoryCode = async (req: RequestWithQuery<DataFindOptions>, res: Response, next: NextFunction) => {
        try {
            const { code } = req.params

            const posts = await this.postService.getPostsByCategoryCode(code, {
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

            const posts = await this.postService.getPostsByAuthorship(Number(authorId))
            return res.send(posts)
        } catch(e) {
            next(e)
        }
    }
    search = async (req: RequestWithQuery<{ query: string } & DataFindOptions>, res: Response, next: NextFunction) => {
        try {
            if (req.query.take < 1) {
                throw ApiError.BadRequest('Wrong TAKE value')
            }

            const maxPage = await this.postService.getPagesAmount(req.query.take, { 'postTitle': ILike(`%${req.query.query}%`) })
            const searchedPosts = await this.postService.search(req.query.query, {
                ...req.query
            })

            return res.send({ posts: searchedPosts, page: Number(req.query.page), maxPage })
        } catch(e) {
            next(e)
        }
    }
    create = async (req: RequestWithBody<PostInputDto>, res: Response, next: NextFunction) => {
        try {
            const inputImage = req.file
            if (!inputImage) {
                throw ApiError.MissingParameters("Image file was not given")
            }

            const post = await this.postService.create({
                ...req.body,
                image: inputImage,
                authorId: req.user.id,
            })
            res.send(post)
        } catch(e) {
            next(e)
        }
    }
    update = async (req: RequestWithBody<PostUpdateDto & { id: string, authorId: number }>, res: Response, next: NextFunction) => {
        try {
            if (req.user.id !== req.body.authorId) {
                throw ApiError.Forbidden("The update can't be done because you're not the author of this article")
            }

            const inputImage = req.file
            const updatedPost = await this.postService.update(req.body.id, {
                ...req.body,
                userId: req.user.id,
                image: inputImage
            })
            
            return res.send(updatedPost)
        } catch(e) {
            next(e)
        }
    }
    delete = async (req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) => {
        try {
            const post = await this.postService.delete(req.body.postId)

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
    savePost = async (req: RequestWithBody<{ postId: string }>, res: Response, next: NextFunction) => {
        try {
            const user = req.user

            const userPosts = await this.saverService.savePost(req.body.postId, user.id)
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
            await this.postService.registerView(req.body.postId)
            return res.status(HttpStatusCodes.UPLOADED).send({ message: 'View added successfully' })
        } catch(e) {
            next(e)
        }
    }
    checkIfExistsByTitle = async (req: RequestWithBody<{ title: string }>, res: Response, next: NextFunction) => {
        try {
            const response = await this.postService.checkIfExistsByTitle(req.body.title)
            return res.send({ response })
        } catch(e) {
            next(e)
        }
    }
}

export default new PostController()