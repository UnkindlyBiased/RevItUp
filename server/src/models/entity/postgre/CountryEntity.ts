import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./UserEntity";

@Entity({ 
    name: 'Countries',
    orderBy: {
        "name": "ASC"
    }
 })
export class CountryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ unique: true })
    countryCode: string

    @Column()
    flagImgLink: string

    @OneToMany(() => UserEntity, user => user.country)
    users: UserEntity[]
}