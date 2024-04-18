import PostModel from "../domain/Post";
import PostShortDto from "../dto/posts/PostShortDto";
import PostEntity from "../entity/postgre/PostEntity";
import IDataMapper from "../misc/IDataMapper";
import CommentMapper from "./CommentMapper";
import UserMapper from "./UserMapper";

class PostMapper implements IDataMapper<PostModel, PostEntity> {
    toDataModel(entity: PostEntity): PostModel {
        return {
            id: entity.id,
            postTitle: entity.postTitle,
            previewText: entity.previewText,
            text: entity.text,
            imageLink: entity.imageLink,
            postLink: entity.postLink,
            creationDate: entity.creationDate,
            author: UserMapper.mapUserModelToUserShortDto(entity.author),
            comments: entity.comments.map(comment => CommentMapper.toDataModel(comment))
        }
    }

    mapPostToPostShortDto(model: PostModel): PostShortDto {
        return {
            id: model.id,
            postTitle: model.postTitle,
            previewText: model.previewText,
            imageLink: model.imageLink,
            postLink: model.postLink
        }
    }
}

export default new PostMapper()