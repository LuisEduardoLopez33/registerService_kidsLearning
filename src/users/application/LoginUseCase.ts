import TokenGenerator from "../../jswt/token";
import { LoginData } from "../domain/UsersRepository";
import { UserRepositoryr } from "../infraestructure/UserRepository";
export class LoginUseCase {
  constructor(readonly userRepository: UserRepositoryr) {}

  async run(email: LoginData) {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      throw new Error("LOS DATOS NO COINCIDEN");
    } else {
      const clave = "ELMokYpNWVhKDQNEyKiXs7Hbl0UJLkYpGKpMppU2eZZ1";
      const generador = new TokenGenerator(clave);
      const iduser = user.id;
      if (!iduser) {
        return {
          success: false,
          message: "usuario o contraseña incorectos",
        };
      }
      const token = generador.generateToken(iduser, "1d");
      return {
        success: true,
        message: "Inicio de sesión exitoso",
        token: token,
        userData: {
          idUser: user.id,
          userName: user.name,
        },
      };
    }
  }
}
