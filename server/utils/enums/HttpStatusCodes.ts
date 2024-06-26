export enum HttpStatusCodes {
    SUCCESS = 200,
    UPLOADED = 201,
    DELETED = 204,

    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    NOT_ACCEPTABLE = 406,
    CONFLICT = 409,
    MISSING_PARAMS = 422,

    INTERNAL = 500
}