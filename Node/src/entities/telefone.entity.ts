import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("Telefones")
class Telefone{

    @PrimaryGeneratedColumn('uuid')
    id:string

    @Column()
    telefone:string

    @ManyToMany(() =>User, user => user.telefone)
    telefoneId:User[]

    @ManyToMany(() =>Contact, contact => contact.telefoneContact)
    telefoneContactId:Contact[]

}

export {Telefone}