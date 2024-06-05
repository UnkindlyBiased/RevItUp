import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ThreadCategories' })
export default class ThreadCategoryEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    threadCategoryName: string

    @Column({ unique: true })
    threadCategoryCode: string

    @Column()
    threadCategoryColor: string
}