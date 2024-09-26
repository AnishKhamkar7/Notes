import { Request, Response } from "express";
import ErrorFactory from "../errors";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import envConfig from "../config/env.config";
import ApiResponse from "../http/ApiResponse";
import { StatusCodes } from "http-status-codes";
import handleApiResponse from "../http/handleApiResponse";

export default class UserController {
  registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      throw ErrorFactory.badRequestError("All fields are required");
    }

    const isUser = await User.findOne({ email });

    if (isUser) {
      throw ErrorFactory.conflictError("User already exists");
    }

    const user = await User.create({
      name,
      email,
      password,
    });

    if (!user) {
      throw ErrorFactory.internalServerError("User Registration Failed");
    }

    const accessToken = jwt.sign(
      { _id: user._id },
      envConfig.JWT_ACCESS_TOKEN_SECRET,
      {
        expiresIn: envConfig.JWT_ACCESS_TOKEN_EXPIRY,
      }
    );

    const response = ApiResponse.success({
      data: { user, accessToken },
      message: "User Registered Successfully",
      statusCode: StatusCodes.CREATED,
    });
    handleApiResponse(res, response);
  };
}
