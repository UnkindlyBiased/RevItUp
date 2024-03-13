import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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

    @CreateDateColumn()
    registrationDate: Date

    @BeforeInsert()
    @BeforeUpdate()
    editData() {
        this.username = this.username.trim()
        this.emailAddress = this.emailAddress.trim()
    }

}