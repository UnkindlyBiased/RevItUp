import CommentModel from "../domain/Comment";
import CommentInputDto from "../dto/comments/CommentInputDto";
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
}

export default new CommentMapper()