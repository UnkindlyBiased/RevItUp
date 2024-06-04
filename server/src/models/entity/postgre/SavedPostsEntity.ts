import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import UserEntity from "./UserEntity";

@Entity({ name: "SavedPosts" })
export default class SavedPostsEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("uuid", { array: true })
    posts: string[]

    @OneToOne(() => UserEntity, user => user.savedPosts, {
        cascade: true,
        onDelete: 'CASCADE'
    })
    @JoinColumn()
    user: UserEntity
}