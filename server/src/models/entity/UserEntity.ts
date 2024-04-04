import { Column, CreateDateColumn, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./CountryEntity";
import { TokenEntity } from "./TokenEntity";

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

    @Column({ default: false })
    isActivated: boolean

    @Column({ type: 'varchar', nullable: true })
    activationLink: string | null

    @CreateDateColumn()
    registrationDate: Date

    @ManyToOne(() => CountryEntity, country => country.users)
    country: CountryEntity

    @OneToOne(() => TokenEntity, token => token.user)
    refreshToken: TokenEntity
}