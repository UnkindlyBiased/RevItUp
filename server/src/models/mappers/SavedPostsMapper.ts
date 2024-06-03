import SavedPostsModel from "../domain/SavedPosts";
import SavedPostsEntity from "../entity/postgre/SavedPostsEntity";
import IDataMapper from "../misc/IDataMapper";

class SavedPostsMapper implements IDataMapper<SavedPostsModel, SavedPostsEntity> {
    toDataModel(entity: SavedPostsEntity): SavedPostsModel {
        return {
            posts: entity.posts,
            userId: entity.user.id
        }
    }
}

export default new SavedPostsMapper()