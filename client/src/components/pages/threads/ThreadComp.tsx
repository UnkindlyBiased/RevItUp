import { Link } from "react-router-dom";

import ThreadShort from "@/types/data/threads/ThreadShort";
import AppRoutes from "@/utils/enums/AppRoutes";
import DateSpan from "@/components/generic/misc/DateSpan";
import ReadableStats from "@/components/generic/misc/ReadableStats";

function ThreadComp({ thread }: { thread: ThreadShort }): React.ReactElement {
    return (
        <div className="flex justify-between items-center px-3 py-2 border-2 rounded-lg">
            <div className="flex flex-col h-fit w-96 space-y-1">
                <Link to={AppRoutes.OPENED_THREAD.replace(':link', thread.threadLink)} className="text-xl font-medium">
                    {thread.threadTitle}
                </Link>
                <div className="flex size-fit space-x-3">
                    <DateSpan date={thread.creationDate} />
                    <ReadableStats views={thread.views} />
                </div>
            </div>
            <span className="font-medium hover:font-bold" children={thread.threadCategory.threadCategoryName} />
            <div className="flex h-fit space-x-1 w-96 justify-end">
                <span children='Author' />
                <span children='->' />
                <Link 
                    to={'/'} 
                    children={thread.author.username} className="font-bold" />
            </div>
        </div>
    )
}

export default ThreadComp