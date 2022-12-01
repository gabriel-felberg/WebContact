import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity("contacts")
class Contact{

    @PrimaryGeneratedColumn()
    id:string

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    telefone:string

    // @ManyToOne(()=>User, (user_id)=>user_id.id)
    // user_id:User
}

export {Contact}
