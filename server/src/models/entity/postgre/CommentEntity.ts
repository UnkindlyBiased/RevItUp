import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, Tree, TreeChildren, TreeParent } from "typeorm";

import UserEntity from "./UserEntity";
import PostEntity from "./PostEntity";
import ThreadEntity from "./ThreadEntity";
@Entity({ 
    name: "Comments",
    orderBy: {
        'creationDate': 'ASC'
    }
})
@Tree('nested-set')
export default class CommentEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    text: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @ManyToOne(() => UserEntity, user => user.comments, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    user: UserEntity

    @TreeParent({
        onDelete: 'CASCADE'
    })
    parent: CommentEntity;

    @TreeChildren({
        cascade: true
    })
    children: CommentEntity[];

    @ManyToOne(() => PostEntity, {
        cascade: true,
        onDelete: 'CASCADE',
        nullable: true
    })
    post: PostEntity

    @ManyToOne(() => ThreadEntity, {
        cascade: true,
        onDelete: 'CASCADE',
        nullable: true
    })
    thread: ThreadEntity
}