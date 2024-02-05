import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { PostEntity } from './PostEntity.ts'

@Entity({name: "Users"})
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    userName: string

    @Column({default: null})
    fullName?: string

    @Column({default: null})
    biography?: string

    @CreateDateColumn()
    registrationDate?: Date

    @Column({unique: true})
    emailAddress: string

    @Column()
    password: string

    @OneToMany(() => PostEntity, post => post.author)
    posts: PostEntity[]
}