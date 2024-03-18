import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./CountryEntity";

@Entity({ 
    name: 'Users',
    orderBy: {
        "registrationDate": "DESC"
    }
 })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ nullable: true })
    biography: string

    @Column({ unique: true })
    emailAddress: string

    @CreateDateColumn()
    registrationDate: Date

    @ManyToOne(() => CountryEntity, country => country.users)
    country: CountryEntity
}