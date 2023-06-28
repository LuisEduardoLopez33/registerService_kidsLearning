import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { LoginUseCase } from "../application/LoginUseCase";
import { UserController } from "./UserController";
import { UserRepositoryr } from "./UserRepository";
const userRepository = new UserRepositoryr();

export const createUserUseCase = new CreateUserUseCase(userRepository);
export const loginUserCase = new LoginUseCase(userRepository);
export const userController = new UserController(
  createUserUseCase,
  loginUserCase
);
