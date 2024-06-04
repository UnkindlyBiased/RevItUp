import ThreadModel from "../domain/Thread";
import ThreadEntity from "../entity/postgre/ThreadEntity";
import IDataMapper from "../misc/IDataMapper";
import UserMapper from "./UserMapper";

class ThreadMapper implements IDataMapper<ThreadModel, ThreadEntity> {
    toDataModel(entity: ThreadEntity): ThreadModel {
        return {
            ...entity
        }
    }
}

export default new ThreadMapper()