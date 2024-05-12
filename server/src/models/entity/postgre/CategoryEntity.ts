import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'Categories',
    orderBy: {
        "id": "ASC"
    }
})
export default class CategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    categoryName: string

    @Column()
    categoryColor: string

    @Column()
    categoryLogo: string

    @Column({ unique: true })
    categoryCode: string

    @Column({ nullable: true })
    biography: string

    @Column({ default: 2000 })
    categoryCreationDate: number
}