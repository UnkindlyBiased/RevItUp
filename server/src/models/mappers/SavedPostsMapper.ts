import SavedPostsModel from "../domain/SavedPosts";
import SavedPostsEntity from "../entity/mongo/SavedPostsEntity";
import IDataMapper from "../misc/IDataMapper";

class SavedPostsMapper implements IDataMapper<SavedPostsModel, SavedPostsEntity> {
    toDataModel(entity: SavedPostsEntity): SavedPostsModel {
        return {
            posts: entity.posts,
            userId: entity.userId
        }
    }
}

export default new SavedPostsMapper()