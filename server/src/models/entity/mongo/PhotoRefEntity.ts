import { Column, Entity, ObjectId, ObjectIdColumn, OneToOne } from "typeorm";


@Entity({ name: 'PhotoRefs', database: 'RevItUpDb' })
export default class PhotoRefEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ unique: true })
    ref: string
}