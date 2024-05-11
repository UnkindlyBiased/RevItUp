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
            user: UserMapper.mapUserModelToUserShortDto(entity.user),
            creationDate: entity.creationDate,
            repliedToId: entity.repliedTo?.id || null
        }
    }
    toShortDto(entity: CommentEntity): CommentShortDto {
        return {
            id: entity.id,
            text: entity.text,
            creationDate: entity.creationDate
        }
    }
}

export default new CommentMapper()