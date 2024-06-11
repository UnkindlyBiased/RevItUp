import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import CountryEntity from "./CountryEntity";
import TokenEntity from "./TokenEntity";

import UserRoles from "../../../../utils/enums/UserRoles";
import CommentEntity from "./CommentEntity";
import SavedPostsEntity from "./SavedPostsEntity";

@Entity({ name: 'Users' })
export default class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ unique: true })
    userLink: string

    @Column({ nullable: true })
    biography: string

    @Column({ unique: true })
    emailAddress: string

    @Column({ default: false })
    isVerified: boolean

    @Column({ type: 'varchar', nullable: true })
    activationLink: string | null

    @CreateDateColumn()
    registrationDate: Date

    @Column({ nullable: true })
    pfpLink: string

    @Column({ type: 'enum', enum: UserRoles, default: UserRoles.DEFAULT })
    role: UserRoles

    @ManyToOne(() => CountryEntity, {
        eager: true
    })
    @JoinColumn()
    country: CountryEntity

    @OneToMany(() => CommentEntity, comment => comment.user)
    comments: CommentEntity[]

    @OneToOne(() => TokenEntity, token => token.user)
    refreshToken: TokenEntity

    @OneToOne(() => SavedPostsEntity, savedPosts => savedPosts.user)
    savedPosts: SavedPostsEntity
}