import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CountryEntity } from "./CountryEntity";
import { TokenEntity } from "./TokenEntity";
import UserRoles from "../../../../utils/enums/UserRoles";
import PostCommentEntity from "./CommentEntity";

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

    @ManyToOne(() => CountryEntity, country => country.users, {
        eager: true
    })
    @JoinColumn()
    country: CountryEntity

    @OneToMany(() => PostCommentEntity, comment => comment.user)
    comments: PostCommentEntity[]

    @OneToOne(() => TokenEntity, token => token.user)
    refreshToken: TokenEntity
}