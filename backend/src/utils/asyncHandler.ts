import { NextFunction, Request, Response } from "express";

type RequestHandler<Params, Body, Query> = (
  req: Request<Params, unknown, Body, Query>,
  res: Response,
  next: NextFunction
) => Promise<void> | void;

export default function asyncHandler<Params, Body, Query>(
  requestHandler: RequestHandler<Params, Body, Query>
) {
  return (
    req: Request<Params, unknown, Body, Query>,
    res: Response,
    next: NextFunction
  ) => {
    Promise.resolve(requestHandler(req, res, next)).catch(next);
  };
}
