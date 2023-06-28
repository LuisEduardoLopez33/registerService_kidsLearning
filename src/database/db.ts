import { DataSource } from "typeorm";

import UserPlan from "../users/domain/UserPlan";
import UserRol from "../users/domain/UserRol";
import User from "../users/domain/Users";

export default new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "12345678",
  database: "kidslearning",
  entities: [User, UserRol, UserPlan],
  synchronize: true,
  logging: false,
});
