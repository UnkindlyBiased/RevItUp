import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";
import CategoryEntity from "./CategoryEntity";

@Entity({ name: "Posts" })
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

    @Column({ default: 0, type: 'int' })
    views: number

    @ManyToOne(() => UserEntity, {
        eager: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    author: UserEntity

    @ManyToOne(() => CategoryEntity, category => category.posts, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    category: CategoryEntity
}