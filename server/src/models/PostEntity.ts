import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Posts' })
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    postTitle: string

    @Column()
    previewText: string

    @Column()
    postText: string

    @CreateDateColumn()
    creationDate: Date
}