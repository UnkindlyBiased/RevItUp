import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ name: "Comments" })
export default class CommentEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    text: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @ManyToOne(() => UserEntity, user => user.comments)
    user: UserEntity

    @ManyToOne(() => CommentEntity, comment => comment.replies, { 
        nullable: true
    })
    repliedTo: CommentEntity;

    @OneToMany(() => CommentEntity, comment => comment.repliedTo)
    replies: CommentEntity[];
}