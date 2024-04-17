import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import CommentEntity from "./CommentEntity";

@Entity({ 
    name: "Posts",
    orderBy: {
        'creationDate': 'DESC'
    }
 })
export default class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    postTitle: string
    
    @Column()
    previewText: string

    @Column()
    text: string

    @Column()
    imageLink: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @OneToOne(() => UserEntity, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    author: UserEntity

    @OneToMany(() => CommentEntity, comment => comment.post, {
        eager: true
    })
    comments: CommentEntity[]
}