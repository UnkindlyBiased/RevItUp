import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({
    name: 'Tokens'
})
export class TokenEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    refreshToken: string

    @OneToOne(() => UserEntity, user => user.refreshToken, {
        cascade: true,
        onDelete: "CASCADE"
    })
    @JoinColumn()
    user: UserEntity
}