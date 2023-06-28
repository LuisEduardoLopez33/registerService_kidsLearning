import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("userrol")
export default class UserRol {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("int")
  idUser?: number;

  @Column("int")
  idRol?: number;
}
