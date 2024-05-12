import { Request } from "express";

type RequestWithBody<T> = Request<Record<string, any>, Record<string, any>, T>;
type RequestWithParams<T> = Request<T>
type RequestWithQuery<T> = Request<Record<string, any>, Record<string, any>, Record<string, any>, T>

export { RequestWithBody, RequestWithParams, RequestWithQuery }