import ThreadCategoryShort from "@/types/data/threads/categories/ThreadCategoryShort";

function ThreadCategoryLink(cat: ThreadCategoryShort) {
    return (
        <>
            <span children={cat.threadCategoryName}
                className="uppercase" />
            <div className="w-[1px] h-6" style={{ backgroundColor: cat.threadCategoryColor }} />
        </>
    )
}

export default ThreadCategoryLink