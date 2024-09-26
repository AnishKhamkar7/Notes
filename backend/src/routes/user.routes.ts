import { Router } from "express";
import UserController from "../controller/user.controller";
import authMiddleware from "../middleware/auth.middleware";
import asyncHandler from "../utils/asyncHandler";

const userController = new UserController();

const router = Router();

router.route("/register").post(asyncHandler(userController.registerUser));

router.route("/login").post(asyncHandler(userController.loginUser));

router
  .route("/get-user")
  .get(authMiddleware, asyncHandler(userController.viewUser));

export default router;
