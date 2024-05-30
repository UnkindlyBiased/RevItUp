import { HttpStatusCodes } from "../enums/HttpStatusCodes"

export class ApiError extends Error {
    public readonly status: number
    public readonly errors: string[]

    constructor(status: number, message: string, errors: string[]) {
        super(message)
        this.status = status
        this.errors = errors
    }
    
    // * 4XX - Client error responses
    static BadRequest(message: string, errors: string[] = []) {
        return new ApiError(HttpStatusCodes.BAD_REQUEST, message, errors)
    }
    static Unauthorized(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.UNAUTHORIZED, message, errors)
    }
    static Forbidden(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.FORBIDDEN, message, errors)
    }
    static NotFound(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.NOT_FOUND, message, errors)
    }
    static Conflict(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.CONFLICT, message, errors)
    }
    static MissingParameters(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.MISSING_PARAMS, message, errors)
    }

    showErrorData(): object {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors
        }
    }
}