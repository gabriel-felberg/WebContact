import { Exclude } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Contact } from "./contact.entity";
import { Email } from "./email.entity";
import { Telephone } from "./telephone.entity";

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

  @OneToMany(() => Telephone, (telephone) => telephone.telephoneId, {
    eager: true,
  })
  telephone: Telephone[];

  @OneToMany(() => Contact, (user_id) => user_id.user_id, { eager: true, onDelete:"CASCADE" })
  list_contacts: Contact[];
}

export { User };
