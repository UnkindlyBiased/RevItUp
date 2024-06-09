import ThreadCategoryModel from "../domain/ThreadCategory";
import ThreadCategoryDto from "../dto/threads/ThreadCategoryDto";
import ThreadCategoryEntity from "../entity/postgre/ThreadCategoryEntity";
import IDataMapper from "../misc/IDataMapper";

class ThreadCategoryMapper implements IDataMapper<ThreadCategoryModel, ThreadCategoryEntity> {
    toDataModel(entity: ThreadCategoryEntity): ThreadCategoryModel {
        return {
            ...entity
        }
    }
    toDto(model: ThreadCategoryModel): ThreadCategoryDto {
        return {
            threadCategoryCode: model.threadCategoryCode,
            threadCategoryName: model.threadCategoryName,
            threadCategoryColor: model.threadCategoryColor
        }
    }
}

export default new ThreadCategoryMapper()