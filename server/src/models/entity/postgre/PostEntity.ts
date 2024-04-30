import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ 
    name: "Posts",
    orderBy: {
        'creationDate': 'DESC'
    }
 })
export default class PostEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ unique: true })
    postTitle: string
    
    @Column()
    previewText: string

    @Column()
    text: string

    @Column()
    imageLink: string

    @Column({ nullable: true })
    postLink: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @ManyToOne(() => UserEntity, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    author: UserEntity
}