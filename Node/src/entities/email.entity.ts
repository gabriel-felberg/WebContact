import {
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("emails")
class Email {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @ManyToMany(() =>User, user => user.email)
  emailId: User[];

  @ManyToMany(() =>Contact, contact => contact.emailContact)
  emailContactId: Contact[];
}

export { Email };
