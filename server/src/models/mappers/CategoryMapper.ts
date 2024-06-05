import CategoryModel from "../domain/Category";
import CategoryShortDto from "../dto/categories/CategoryShortDto";
import CategoryEntity from "../entity/postgre/CategoryEntity";
import IDataMapper from "../misc/IDataMapper";

class CategoryMapper implements IDataMapper<CategoryModel, CategoryEntity> {
    toDataModel(entity: CategoryEntity): CategoryModel {
        return {
            id: entity.id,
            categoryName: entity.categoryName,
            categoryCode: entity.categoryCode,
            logo: entity.logo,
            categoryColor: entity.categoryColor,
            biography: entity.biography,
            сreationDate: entity.creationDate,
        }
    }

    toCategoryShortDto(model: CategoryModel | CategoryEntity): CategoryShortDto {
        return {
            id: model.id,
            categoryName: model.categoryName,
            categoryColor: model.categoryColor,
            logo: model.logo,
            categoryCode: model.categoryCode,
        }
    }
}

export default new CategoryMapper()