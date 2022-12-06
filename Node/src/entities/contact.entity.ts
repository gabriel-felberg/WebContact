import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Email } from "./email.entity";
import { Telefone } from "./telefone.entity";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Email, (email) => email.emailContact, { eager: true })
  emailContact: Email[];

  @OneToMany(() => Telefone, (telefone) => telefone.telefoneContact, {
    eager: true,
  })
  telefoneContact: Telefone[];

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user_id: User;
}

export { Contact };
