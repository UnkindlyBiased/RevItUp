import { Link } from "react-router-dom";

import ThreadCategoryShort from "@/types/data/threads/categories/ThreadCategoryShort";
import AppRoutes from "@/utils/enums/AppRoutes";

function ThreadCategoryLink(cat: ThreadCategoryShort) {
    return (
        <>
            <Link children={cat.threadCategoryName}
                to={AppRoutes.THREAD_CATEGORY.replace(':code', cat.threadCategoryCode)}
                className="uppercase" />
            <div className="w-[1px] h-6" style={{ backgroundColor: cat.threadCategoryColor }} />
        </>
    )
}

export default ThreadCategoryLink