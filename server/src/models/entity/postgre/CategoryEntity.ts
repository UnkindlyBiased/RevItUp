import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

import PostEntity from "./PostEntity";

@Entity({ name: 'Categories' })
export default class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    categoryName: string

    @Column()
    categoryColor: string

    @Column()
    logo: string

    @Column({ unique: true })
    categoryCode: string

    @Column({ nullable: true })
    biography: string

    @Column({ default: 2000 })
    creationDate: number

    @OneToMany(() => PostEntity, post => post.category)
    posts: PostEntity[]
}