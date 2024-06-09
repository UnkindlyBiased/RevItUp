import CommentModel from "../domain/Comment";
import CommentShortDto from "../dto/comments/CommentShortDto";
import CommentEntity from "../entity/postgre/CommentEntity";
import IDataMapper from "../misc/IDataMapper";
import UserMapper from "./UserMapper";

class CommentMapper implements IDataMapper<CommentModel, CommentEntity> {
    toDataModel(entity: CommentEntity): CommentModel {
        return {
            id: entity.id,
            text: entity.text,
            user: UserMapper.toUserShortDto(entity.user),
            creationDate: entity.creationDate,
            children: entity.children.length ? 
                entity.children.map(child => this.toDataModel(child)) : null,
        }
    }
    toShortDto(entity: CommentModel): CommentShortDto {
        return {
            id: entity.id,
            text: entity.text,
            creationDate: entity.creationDate,
            children: entity.children
        }
    }
}

export default new CommentMapper()