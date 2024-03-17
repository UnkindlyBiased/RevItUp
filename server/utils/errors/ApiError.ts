import { HttpStatusCodes } from "../enums/HttpStatusCodes"

export class ApiError extends Error {
    public readonly status: number
    public readonly errors: string[]

    constructor(status: number, message: string, errors: string[]) {
        super(message)
        this.status = status
        this.errors = errors
        this.message = message
    }

    static NotFound(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.NOT_FOUND, message, errors)
    }

    static Conflict(message: string, errors: string[] = []): ApiError {
        return new ApiError(HttpStatusCodes.CONFLICT, message, errors)
    }

    showErrorData(): object {
        return {
            status: this.status,
            message: this.message,
            errors: this.errors
        }
    }
}