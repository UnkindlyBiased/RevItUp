import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { UserEntity } from './UserEntity.ts'

@Entity({name: 'Posts'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column()
    previewText: string

    @Column({default: "To be continued..."})
    postText: string

    @Column({default: null})
    imageLink?: string

    @ManyToOne(() => UserEntity, user => user.posts)
    @JoinColumn({name: 'authorId'})
    author: UserEntity

    @Column({default: 1})
    authorId: number
}