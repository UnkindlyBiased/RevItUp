import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'Tests'})
export class TestEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    data: string
}