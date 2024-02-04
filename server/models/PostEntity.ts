import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity({name: 'Posts'})
export class PostEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({unique: true})
    title: string

    @Column()
    postText: string
}