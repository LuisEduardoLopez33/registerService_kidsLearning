import TokenGenerator from "../../jswt/token";
import { LoginData } from "../domain/UsersRepository";
import { UserRepositoryr } from "../infraestructure/UserRepository";

export class LoginUseCase {
  constructor(readonly userRepository: UserRepositoryr) {}

  async run(email: LoginData) {
    const user = await this.userRepository.getByEmail(email);
    if (typeof user == "number") {
      return {
        success: false,
        message: "usuario o contraseña incorrectos",
      };
    }

    const clave = "ELMokYpNWVhKDQNEyKiXs7Hbl0UJLkYpGKpMppU2eZZ1";
    const generador = new TokenGenerator(clave);
    const iduser = user.id;
    if (typeof iduser == "number") {
      const token = generador.generateToken(iduser, "6d");
      const plan = await this.userRepository.getPlanUser(iduser);
      const rol = await this.userRepository.getRolUser(iduser);
      return {
        success: true,
        message: "Inicio de sesión exitoso",
        token: token,
        userData: {
          idUser: user.id,
          userName: user.name,
          user_plan: plan,
          user_rol: rol,
        },
      };
    }
  }
}
