import UserPlan from "./UserPlan";
import UserRol from "./UserRol";
import User from "./Users";
export interface UserRepository<T> {
  create(user: UserData): Promise<User | number>;
  createRol(idUser: number, idRol: number): Promise<void>;
  createPlan(idUser: number, idPlan: number): Promise<void>;
  getById(id: number): Promise<User>;
  getByEmail(user: LoginData): Promise<User | number>;
  getPlanUser(iduser: number): Promise<UserPlan>;
  getRolUser(iduser: number): Promise<UserRol>;
}

export interface UserData {
  name: string;
  email: string;
  password: string;
  idRol: number;
  idPlan: number;
}

export interface LoginData {
  email: string;
  password: string;
}
