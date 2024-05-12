import CategoryModel from "../domain/Category";
import CategoryShortDto from "../dto/categories/CategoryShortDto";
import CategoryEntity from "../entity/postgre/CategoryEntity";
import IDataMapper from "../misc/IDataMapper";

class CategoryMapper implements IDataMapper<CategoryModel, CategoryEntity> {
    toDataModel(entity: CategoryEntity): CategoryModel {
        return { ...entity }
    }

    mapModelToCategoryShortDto(model: CategoryModel): CategoryShortDto {
        return {
            id: model.id,
            categoryName: model.categoryName,
            categoryColor: model.categoryColor,
            categoryLogo: model.categoryLogo,
            categoryCode: model.categoryCode
        }
    }
}

export default new CategoryMapper()