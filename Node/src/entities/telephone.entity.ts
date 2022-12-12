import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("Telephones")
class Telephone {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  telephone: string;

  @ManyToOne(() => User, (user) => user.telephone, { onDelete: "CASCADE" })
  telephoneId: User;

  @ManyToOne(() => Contact, (contact) => contact.telephoneContact, {
    onDelete: "CASCADE",
  })
  telephoneContact: Contact;
}

export { Telephone };
