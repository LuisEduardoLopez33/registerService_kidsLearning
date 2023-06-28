import { Router } from "express";

import { userController } from "./UserDependecies";

export const userRouter = Router();

userRouter.post("/addUser/", userController.createUser.bind(userController));
userRouter.post("/login/", userController.login.bind(userController));
