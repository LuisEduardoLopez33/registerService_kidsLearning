import { Request, Response } from "express";

import { CreateUserUseCase } from "../application/CreateUserUseCase";
import { LoginUseCase } from "../application/LoginUseCase";
import { LoginData, UserData } from "../domain/UsersRepository";

export class UserController {
  constructor(
    readonly repository: CreateUserUseCase,
    readonly loginRepository: LoginUseCase
  ) {}

  async createUser(req: Request, res: Response) {
    const user: UserData = req.body;
    if (!user) {
      res.status(400).send("Usuario vacío");
      return;
    }
    const respuesta = await this.repository.run(user);
    if (respuesta == 2) {
      res.status(400).send("No se guardo");
    } else {
      res.status(200).send("se guardo");
    }
  }

  async login(req: Request, res: Response) {
    const user: LoginData = req.body;
    console.log(user);
    // if (!user.email && !user.password) {
    //   res.status(400).send("Usuario vacío");
    //   return;
    // }
    const respuesta = await this.loginRepository.run(user);
    if (!respuesta) {
      res.status(400).send("Error");
    } else {
      res.status(200).send(respuesta);
    }
  }
}
