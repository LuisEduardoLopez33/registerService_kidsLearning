import * as bcrypt from "bcrypt";

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

      // Encriptar la contraseña utilizando bcrypt
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const newUser = userR.create({
        name: user.name,
        email: user.email,
        password: hashedPassword, // Guardar la contraseña encriptada
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

  async getByEmail(user: LoginData): Promise<User | number> {
    try {
      const userR = database.getRepository(User);
      const email = user.email;
      const password = user.password;
      console.log(email, password);

      // Buscar el usuario por el correo electrónico (email)
      const usuario = email ? await userR.findOneBy({ email }) : null;

      // Si no se encuentra el usuario, retornar un error
      if (!usuario) {
        return 2;
      }

      // Verificar si la propiedad 'password' existe y no es 'undefined'
      if (usuario.password === undefined) {
        return 2;
      }

      // Comparar la contraseña proporcionada por el usuario con el hash almacenado en la base de datos
      const passwordMatch = await bcrypt.compare(password, usuario.password);

      // Si la contraseña no coincide, retornar un error
      if (!passwordMatch) {
        return 2;
      }

      // Si la contraseña coincide, retornar el usuario

      return usuario;
    } catch (error) {
      console.log(error);
      throw error; // Propagar el error para manejarlo en la capa superior
    }
  }

  async getPlanUser(iduser: number): Promise<UserPlan> {
    try {
      const planU = database.getRepository(UserPlan);
      const idUser = iduser;
      const plan = idUser ? await planU.findOneBy({ idUser }) : null;
      if (!plan) {
        throw new Error("No existe la relacion de un plan con este usuario");
      }
      return plan;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getRolUser(iduser: number): Promise<UserRol> {
    try {
      const rolU = database.getRepository(UserRol);
      const idUser = iduser;
      const rol = idUser ? await rolU.findOneBy({ idUser }) : null;
      if (!rol) {
        throw new Error("no existe la relacion de un rol con este usuario");
      }
      return rol;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
