import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import UserEntity from "./UserEntity";
import PostEntity from "./PostEntity";
import ThreadEntity from "./ThreadEntity";

@Entity({ name: "Comments" })
export default class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @ManyToOne(() => UserEntity, user => user.comments, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    user: UserEntity

    @ManyToOne(() => CommentEntity, comment => comment.replies, { 
        nullable: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    repliedTo: CommentEntity;

    @OneToMany(() => CommentEntity, comment => comment.repliedTo)
    replies: CommentEntity[];

    @ManyToOne(() => PostEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    post: PostEntity

    @ManyToOne(() => ThreadEntity, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    thread: ThreadEntity
}