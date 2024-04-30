import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity({ name: "saved_posts" })
export default class SavedPostsEntity {
    @ObjectIdColumn()
    _id: ObjectId

    @Column({ default: [] })
    posts: string[]

    @Column({ unique: true })
    userId: number
}