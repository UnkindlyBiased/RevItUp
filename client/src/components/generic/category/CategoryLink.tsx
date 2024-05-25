import { Link } from "react-router-dom";

import CategoryShort from "@/types/data/category/CategoryShort";
import { cn } from "@/lib/utils";

type CategoryWithLinkProps = {
    category: CategoryShort
    isLinkable?: boolean 
}

function CategoryWithLink({ category, isLinkable }: CategoryWithLinkProps): React.ReactElement {
    return (
        <div className="flex items-center space-x-2">
            <img className="max-w-14" src={category.categoryLogo} />
            <div style={{ backgroundColor: category.categoryColor }} className='w-[1px] h-6' />
            <Link to={`/categories/${category.categoryCode}`} className={cn(!isLinkable && 'pointer-events-none')}>
                <span className="font-bold cursor-pointer hover:underline uppercase">
                    {category.categoryName}
                </span>
            </Link>
        </div>
    )
}

export default CategoryWithLink