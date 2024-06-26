import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import UserEntity from "./UserEntity";
import ThreadCategoryEntity from "./ThreadCategoryEntity";

@Entity('Threads')
export default class ThreadEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ unique: true })
    threadTitle: string

    @Column()
    threadText: string

    @Column({ unique: true })
    threadLink: string

    @CreateDateColumn({ type: "timestamp with time zone", default: () => 'CURRENT_TIMESTAMP' })
    creationDate: Date

    @Column({ default: 0, type: 'int' })
    views: number

    @ManyToOne(() => UserEntity, {
        cascade: true,
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn()
    author: UserEntity

    @ManyToOne(() => ThreadCategoryEntity, {
        cascade: true,
        onDelete: 'CASCADE',
        nullable: false
    })
    @JoinColumn()
    threadCategory: ThreadCategoryEntity
}