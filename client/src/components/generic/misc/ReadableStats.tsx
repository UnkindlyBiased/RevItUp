import { FaEye } from "react-icons/fa6"

function ReadableStats({ views }: { views: number }): React.ReactElement {
    return (
        <div className="flex items-center space-x-2 text-gray-500">
            <FaEye />
            <span children={views} />
        </div>
    )
}

export default ReadableStats