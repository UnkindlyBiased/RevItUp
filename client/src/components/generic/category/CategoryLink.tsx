import { Link } from "react-router-dom";

import CategoryShort from "@/types/data/category/CategoryShort";

function CategoryWithLink({ category }: { category: CategoryShort }): React.ReactElement {
    return (
        <div className="flex items-center space-x-2">
            <img className="w-14" src={category.categoryLogo} />
            <div style={{ backgroundColor: category.categoryColor }} className='w-[1px] h-6' />
            <Link to={`/category/${category.categoryCode}`}>
                <span className="font-bold cursor-pointer hover:underline uppercase">
                    {category.categoryName}
                </span>
            </Link>
        </div>
    )
}

export default CategoryWithLink