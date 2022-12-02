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
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Email, (email) => email.emailContactId, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  emailContact: Email[];

  @ManyToMany(() => Telefone, (telefone) => telefone.telefoneContactId, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  telefoneContact: Telefone[];

  @ManyToOne(() => User, { eager: true, onDelete: "SET NULL" })
  user_id: User;
}

export { Contact };
