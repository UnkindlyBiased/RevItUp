import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name: 'Posts'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    Title: string

    @Column()
    PostText: string
}