import { ApiError } from "../../utils/errors/ApiError"
import UserCreateDto from "../models/dto/users/UserCreateDto"
import UserDetailedDto from "../models/dto/users/UserDetailedDto"
import UserEditDto from "../models/dto/users/UserEditDto"
import UserShortDto from "../models/dto/users/UserShortDto"
import UserMapper from "../models/mappers/UserMapper"
import IUserRepository from "../repositories/IUserRepository"
import bcrypt from 'bcrypt'
import UserModel from "../models/domain/User"
import UserHelper from "../../utils/helpers/UserHelper"
import { v4 } from 'uuid'
import MailService from "./MailService"
import UserTokenDto from "../models/dto/users/UserTokenDto"
import TokenHelper from "../../utils/helpers/TokenHelper"
import TokenService from "./TokenService"
import UserCreateOutputDto from "../models/dto/users/UserCreateOutputDto"
import SaverService from "./SaverService"
import PgSavedPostsRepository from "../repositories/implemented/postgre/PgSavedPostsRepository"
import PgTokenRepository from "../repositories/implemented/postgre/PgTokenRepository"
import TokenModel from "../models/domain/Token"
import FirebaseService from "./FirebaseService"
import FirebaseRefEndponts from "../../utils/enums/FirebaseRefEndpoints"
import UserPictureUploadDto from "../models/dto/users/UserPictureUploadDto"

class UserService {
    private readonly mailService: MailService
    private readonly saverService: SaverService
    private readonly tokenService: TokenService
    private readonly firebaseService: FirebaseService

    constructor(private readonly repository: IUserRepository) {
        this.mailService = new MailService()
        this.saverService = new SaverService(new PgSavedPostsRepository())
        this.tokenService = new TokenService(new PgTokenRepository())
        this.firebaseService = new FirebaseService()
    }

    // * CRUD logic
    async getUsers(): Promise<UserShortDto[]> {
        const users = await this.repository.getUsers()
        if (!users) {
            throw ApiError.NotFound("Users were not found")
        }

        return users.map(user => {
            return UserMapper.toUserShortDto(user)
        })
    }
    async getUserByLink(link: string): Promise<UserDetailedDto> {
        const user = await this.repository.getUserByLink(link)
        return UserMapper.toUserDetailedDto(user)
    }
    async getUserById(id: number): Promise<UserDetailedDto> {
        return UserMapper.toUserDetailedDto(
            await this.repository.getUserById(id)
        )
    }
    create = async (candidate: UserCreateDto): Promise<UserCreateOutputDto> => {
        UserHelper.trimUserData(candidate)

        const hashPassword = bcrypt.hashSync(candidate.password, 3)
        const activationLink = v4()

        candidate.userLink = UserHelper.createLink(candidate.username)

        const user = await this.repository.create({
            ...candidate,
            password: hashPassword,
            activationLink,
        })
        await this.mailService.sendActivationMail(candidate.emailAddress, 
            `http://localhost:${process.env.APP_PORT}/auth/activate/${activationLink}`)
        await this.saverService.create(user.id)

        return this.generateDtoWithTokens(user)
    }
    async update(id: number, updateData: UserEditDto): Promise<UserDetailedDto> {
        UserHelper.trimUserData(updateData)

        const existingUser = await this.repository.getUserById(id)

        const arePasswordsEqual = await bcrypt.compare(updateData.password, existingUser.password)
        if (arePasswordsEqual) {
            updateData.password = existingUser.password
        } else {
            const hashedPassword = await bcrypt.hash(updateData.password, 3)
            updateData.password = hashedPassword
        }

        const updatedUser = await this.repository.update(id, updateData)
        return UserMapper.toUserDetailedDto(updatedUser)
    }
    changeProfilePicture = async (pictureData: UserPictureUploadDto): Promise<void> => {
        const imageRef = await this.firebaseService.uploadImage({
            image: pictureData.image,
            imageName: pictureData.imageName + '-' + Math.floor(Math.random() * 100000000),
            endpoint: FirebaseRefEndponts.USERS
        })
        const imageUrl = await this.firebaseService.getDownloadUrl(imageRef)

        await this.repository.changeProfilePicture(pictureData.id, imageUrl)
    }
    async delete(id: number, password: string): Promise<void> {
        const userToRemove = await this.repository.getUserById(id)
        
        const arePasswordsEqual = await bcrypt.compare(password, userToRemove.password)
        if (!arePasswordsEqual) {
            throw ApiError.Forbidden("Passwords are not equal, not possible to verify your identity")
        }

        await this.repository.delete(id)
    }

    // * Auth logic
    async login(username: string, password: string): Promise<UserCreateOutputDto> {
        const user = await this.repository.getUserByLink(username)
        
        const isPasswordEqual = await bcrypt.compare(password, user.password)
        if (!isPasswordEqual) {
            throw ApiError.Conflict('Passwords are not equal')
        }

        return this.generateDtoWithTokens(user)
    }
    logout = async (refreshToken: string): Promise<TokenModel> => {
        return this.tokenService.removeToken(refreshToken)
    }
    async activate(activationLink: string): Promise<UserEditDto> {
        const user = await this.repository.getUserByActivationLink(activationLink)

        const dto: UserEditDto = UserMapper.toUserEditDto(user)

        if (dto.activationLink) {
            dto.isVerified = true
            dto.activationLink = null
        }

        await this.repository.update(user.id, dto)

        return dto
    }
    refresh = async (refreshToken: string): Promise<UserCreateOutputDto> => {
        if (!refreshToken) {
            throw ApiError.Unauthorized('Refresh token is not valid')
        }

        const userData = TokenHelper.validateRefreshToken(refreshToken)

        const tokenEntity = await this.tokenService.getByRefreshToken(refreshToken)

        if (!userData || !tokenEntity) {
            throw ApiError.Unauthorized('User is unauthorized')
        }

        const user = await this.repository.getUserById(userData.id)
        if (!user) {
            throw ApiError.NotFound('User was not found')
        }

        return await this.generateDtoWithTokens(user)
    }

    private generateDtoWithTokens = async (user: UserModel): Promise<UserCreateOutputDto> => {
        const dto: UserTokenDto = UserMapper.toUserTokenDto(user)

        const tokens = TokenHelper.createTokenPair(dto)
        await this.tokenService.saveToken(dto.id, tokens.refreshToken)

        return {
            user: dto,
            tokens
        } as UserCreateOutputDto
    }
}

export default UserService