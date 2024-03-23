export default interface IDataMapper<DataModel, DataEntity> {
    toDataModel(entity: DataEntity): DataModel
    toDataEntity(model: DataModel): DataEntity
}