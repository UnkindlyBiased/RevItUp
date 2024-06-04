import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'Countries' })
export default class CountryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    name: string

    @Column({ unique: true })
    countryCode: string

    @Column()
    flagImgLink: string
}