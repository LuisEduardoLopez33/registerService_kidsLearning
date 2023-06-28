import { UserData } from "../domain/UsersRepository";
import { UserRepositoryr } from "../infraestructure/UserRepository";

export class CreateUserUseCase {
  constructor(readonly userRepository: UserRepositoryr) {}

  async run(userD: UserData) {
    const user = await this.userRepository.create(userD);
    const idRol = userD.idRol;
    const idPlan = userD.idPlan;
    console.log(idPlan);
    if (!user) {
      throw new Error("NO SE PUDO CREAR EL USUARIO");
    } else {
      await this.userRepository.createRol(user, idRol);
      await this.userRepository.createPlan(user, idPlan);
    }
    return user;
  }
}
