import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./CountryEntity";
import { TokenEntity } from "./TokenEntity";
import UserRoles from "../../../../utils/enums/UserRoles";
import CommentEntity from "./CommentEntity";

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

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.DEFAULT })
    role: UserRoles

    @ManyToOne(() => CountryEntity, country => country.users)
    @JoinColumn()
    country: CountryEntity

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]

    @OneToOne(() => TokenEntity, token => token.user)
    refreshToken: TokenEntity
}