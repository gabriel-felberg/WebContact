import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Contact } from "./contact.entity";
import { User } from "./user.entity";

@Entity("Telefones")
class Telefone{

    @PrimaryGeneratedColumn("uuid")
    id:string

    @Column()
    telefone:string

    @ManyToOne(() =>User, user => user.telefone, {onDelete:"CASCADE"})
    telefoneId:User

    @ManyToOne(() =>Contact, contact => contact.telefoneContact, {onDelete:"CASCADE"})
    telefoneContact:Contact

}

export {Telefone}