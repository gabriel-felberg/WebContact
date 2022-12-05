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
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToMany(() => Email, (email) => email.emailId, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  email: Email[];

  @Column()
  @Exclude()
  password: string;

  @ManyToMany(() => Telefone, (telefone) => telefone.telefoneId, {
    cascade: true,
    eager: true,
  })
  @JoinTable()
  telefone: Telefone[];

  @CreateDateColumn()
  date: Date;

  @OneToMany(() => Contact, (user_id) => user_id.user_id)
  list_contacts: Contact[];
}

// @Entity("users")
// class User{

//     @PrimaryGeneratedColumn("uuid")
//     id:string

//     @Column()
//     name:string

//     @Column()
//     email:string[]

//     @Column()
//     telefone:string[]

//     @CreateDateColumn()
//     date:Date

//     @ManyToOne(()=>Contact, {eager:true})
//     list_contacts:Contact

// }

export { User };
