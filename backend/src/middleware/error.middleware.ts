import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JsonWebTokenError } from "jsonwebtoken";

import { ZodError } from "zod";
import AppError from "../errors/AppError";
import ApiResponse from "../http/ApiResponse";
import handleApiResponse from "../http/handleApiResponse";

export default function errorHandlerMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("Responding with error response");
  console.log("In Error handler middleware.\n", error);

  if (error instanceof AppError) {
    console.log("Error is an instance of AppError");
    const response = ApiResponse.failure({
      statusCode: error.statusCode,
      message: error.message,
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else if (error instanceof ZodError) {
    console.log("Error is an instance of ZodError");
    const response = ApiResponse.failure({
      statusCode: StatusCodes.BAD_REQUEST,
      message: "Validation Error",
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  } else {
    console.log("Error is not an instance of AppError");
    const response = ApiResponse.failure({
      statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Internal Server Error",
      error: {
        ...error,
        stack: error.stack,
      },
    });
    handleApiResponse(res, response);
  }
}
