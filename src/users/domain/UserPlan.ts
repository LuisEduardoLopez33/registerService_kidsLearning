import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("userplan")
export default class UserPlan {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column("int")
  idUser?: number;

  @Column("int")
  idPlan?: number;

  @Column("text")
  status?: string;

  @CreateDateColumn()
  fechaInicio?: Date;
}
