import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Users' })
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    username: string

    @Column()
    password: string

    @Column({ nullable: true })
    biography: string

    @Column({ unique: true })
    emailAddress: string
}