import PostModel from "../domain/Post";
import PostLightModel from "../dto/posts/PostLightModel";
import PostPreviewDto from "../dto/posts/PostPreviewDto";
import PostShortDto from "../dto/posts/PostShortDto";
import PostEntity from "../entity/postgre/PostEntity";
import IDataMapper from "../misc/IDataMapper";
import CategoryMapper from "./CategoryMapper";
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
            views: entity.views,
            author: UserMapper.mapUserModelToUserShortDto(entity.author),
            category: CategoryMapper.mapModelToCategoryShortDto(entity.category)
        }
    }
    toLightDataModel(entity: PostEntity): PostLightModel {
        return {
            id: entity.id,
            postTitle: entity.postTitle,
            previewText: entity.previewText,
            text: entity.text,
            imageLink: entity.imageLink,
            postLink: entity.postLink,
            views: entity.views,
            category: entity.category
        }
    }

    mapPostToPostPreviewDto(model: PostModel | PostLightModel): PostPreviewDto {
        return {
            id: model.id,
            postTitle: model.postTitle,
            previewText: model.previewText,
            imageLink: model.imageLink,
            postLink: model.postLink,
            views: model.views,
            category: model.category
        }
    }
    mapPostToPostShortDto(model: PostModel | PostLightModel): PostShortDto {
        return {
            postTitle: model.postTitle,
            postLink: model.postLink
        }
    }
}

export default new PostMapper()