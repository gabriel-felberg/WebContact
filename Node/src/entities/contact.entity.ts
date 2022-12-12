import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Email } from "./email.entity";
import { Telephone } from "./telephone.entity";
import { User } from "./user.entity";

@Entity("contacts")
class Contact {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Email, (email) => email.emailContact, { eager: true })
  emailContact: Email[];

  @OneToMany(() => Telephone, (telefone) => telefone.telephoneContact, {
    eager: true,
  })
  telephoneContact: Telephone[];

  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user_id: User;
}

export { Contact };
