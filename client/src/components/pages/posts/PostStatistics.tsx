import { FaEye } from "react-icons/fa6"

type PostStatisticsProps = {
    views: number
}

function PostStatistics({ views }: PostStatisticsProps): React.ReactElement {
    return (
        <div className="flex items-center space-x-2 text-gray-500">
            <FaEye />
            <span children={views} />
        </div>
    )
}

export default PostStatistics