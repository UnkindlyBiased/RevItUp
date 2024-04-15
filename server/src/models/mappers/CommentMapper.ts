import CommentModel from "../domain/Comment";
import CommentEntity from "../entity/postgre/CommentEntity";
import IDataMapper from "../misc/IDataMapper";

class CommentMapper implements IDataMapper<CommentModel, CommentEntity> {
    toDataModel(entity: CommentEntity): CommentModel {
        return {
            id: entity.id,
            text: entity.text,
            user: entity.user,
            creationDate: entity.creationDate,
            repliedToId: entity.repliedTo?.id || null
        }
    }
}

export default new CommentMapper()