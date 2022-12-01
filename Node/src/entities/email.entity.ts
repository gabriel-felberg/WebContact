import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity("emails")
class Email {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  email: string;

  @ManyToMany(() =>User, user => user.email)
  emailId: User[];
}

export { Email };
