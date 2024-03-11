export class ApiError extends Error {
    public readonly status: number
    public readonly errors: string[]

    constructor(status: number, message: string, errors: string[]) {
        super(message)
        this.status = status
        this.errors = errors
    }

    static NotFound(message: string, errors: string[] = []) {
        return new ApiError(404, message, errors)
    }

    static Conflict(message: string, errors: string[] = []) {
        return new ApiError(409, message, errors)
    }
}