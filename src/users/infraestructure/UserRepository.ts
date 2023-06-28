import database from "../../database/db";
import UserPlan from "../domain/UserPlan";
import UserRol from "../domain/UserRol";
import User from "../domain/Users";
import { LoginData, UserRepository } from "../domain/UsersRepository";
import { UserData } from "../domain/UsersRepository";

export class UserRepositoryr implements UserRepository<User> {
  async create(user: UserData): Promise<number> {
    try {
      const userR = database.getRepository(User);
      const newUser = userR.create({
        name: user.name,
        email: user.email,
        password: user.password,
      });
      const userresponse = await userR.save(newUser);
      const userid = userresponse.id;
      if (userid === undefined) {
        throw new Error("El ID del usuario es indefinido");
      }
      return userid;
    } catch (error) {
      console.log(error);
      return 2;
    }
  }

  async createRol(idUser: number, idRol: number): Promise<void> {
    try {
      const rolR = database.getRepository(UserRol);
      const newUserRol = rolR.create({
        idUser: idUser,
        idRol: idRol,
      });
      await rolR.save(newUserRol);
    } catch (error) {
      console.log(error);
    }
  }

  async createPlan(idUser: number, idPlan: number): Promise<void> {
    try {
      const planR = database.getRepository(UserPlan);
      const fechaActual: Date = new Date();
      const newUserPlan = planR.create({
        idUser: idUser,
        idPlan: idPlan,
        status: "active",
        fechaInicio: fechaActual.toISOString(),
      });
      await planR.save(newUserPlan);
    } catch (error) {
      console.log(error);
    }
  }
  async getById(id: number): Promise<User> {
    const userR = database.getRepository(User);
    const user = await userR.findOneBy({ id });
    if (user === null) {
      throw new Error("no existe el usuario");
    }
    return user;
  }

  async getByEmail(user: LoginData): Promise<User> {
    const userR = database.getRepository(User);
    const email = user.email;
    const password = user.password;
    const usuario = await userR.findOneBy({ email, password });
    if (usuario === null) {
      return new Error("no existe el usuario");
    }
    return usuario;
  }
}
