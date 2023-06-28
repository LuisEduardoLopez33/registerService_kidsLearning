import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
export default class User {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("text")
  name?: string;

  @Column("text")
  email?: string;

  @Column("text")
  password?: string;
}
