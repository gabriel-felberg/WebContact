import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("emails")
class Email {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  emailId: User;

  @ManyToOne(() => Contact, { onDelete: "CASCADE" })
  emailContact: Contact;
}

export { Email };
