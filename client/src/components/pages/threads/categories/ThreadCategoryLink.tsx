import { Link } from "react-router-dom";

import ThreadCategory from "@/types/data/threads/categories/ThreadCategory";
import AppRoutes from "@/utils/enums/AppRoutes";
function ThreadCategoryLink({ category }: { category: ThreadCategory }) {
    return (
        <div className="px-3 py-2 border-2 rounded-md flex flex-col" style={{ borderColor: category.threadCategoryColor }}>
            <Link to={AppRoutes.THREAD_CATEGORY.replace(':code', category.threadCategoryCode)} className="font-bold text-xl" children={category.threadCategoryName} />
            <span children={category.threadCategoryDescription} />
        </div>
    )
}

export default ThreadCategoryLink