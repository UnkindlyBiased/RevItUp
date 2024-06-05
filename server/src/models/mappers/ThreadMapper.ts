import ThreadModel from "../domain/Thread";
import ThreadLightModel from "../dto/threads/ThreadLightModel";
import ThreadShortDto from "../dto/threads/ThreadShortDto";
import ThreadEntity from "../entity/postgre/ThreadEntity";
import IDataMapper from "../misc/IDataMapper";
import UserMapper from "./UserMapper";

class ThreadMapper implements IDataMapper<ThreadModel, ThreadEntity> {
    toDataModel(entity: ThreadEntity): ThreadModel {
        return {
            ...entity,
            author: UserMapper.toUserShortDto(entity.author),
        }
    }
    toLigthDataModel(entity: ThreadEntity): ThreadLightModel {
        return {
            id: entity.id,
            threadTitle: entity.threadTitle,
            threadLink: entity.threadLink,
            threadText: entity.threadText,
            views: entity.views,
            creationDate: entity.creationDate
        }
    }
    toThreadShortDto(model: ThreadModel): ThreadShortDto {
        return {
            threadTitle: model.threadTitle,
            threadLink: model.threadLink,
            views: model.views,
            creationDate: model.creationDate,
            author: model.author
        }
    }
}

export default new ThreadMapper()