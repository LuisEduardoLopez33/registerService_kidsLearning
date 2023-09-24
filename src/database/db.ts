import { DataSource } from "typeorm";

import UserPlan from "../users/domain/UserPlan";
import UserRol from "../users/domain/UserRol";
import User from "../users/domain/Users";

export default new DataSource({
  type: "postgres",
  host: "52.6.202.96",
  port: 5432,
  username: "luis",
  password: "luis12345678",
  database: "tareas_bd",
  entities: [User, UserRol, UserPlan],
  synchronize: true,
  logging: false,
});
