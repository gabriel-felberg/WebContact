import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { Email } from "./email.entity";
import { Telefone } from "./telefone.entity";

@Entity("users")
class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @CreateDateColumn()
  date: Date;

  @Column()
  @Exclude()
  password: string;

  @OneToMany(() => Email, (email) => email.emailId, {
    eager: true,
  })
  email: Email[];

  @OneToMany(() => Telefone, (telefone) => telefone.telefoneId, {
    eager: true,
  })
  telefone: Telefone[];

  @OneToMany(() => Contact, (user_id) => user_id.user_id, { eager: true })
  list_contacts: Contact[];
}

export { User };
