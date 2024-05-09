import { FaHeart, FaRegHeart } from "react-icons/fa6"

import { useRemoveSavedPost, useSavePost } from "@/hooks/useGetPosts"
import useUserStore from "@/store/UserStore"

function SaveButton({ postId }: { postId: string }): React.ReactElement {
    const isAuth = useUserStore(state => state.isAuth)
    const { mutateAsync: savePost } = useSavePost(postId)

    return (
        <button
            title="Save the post"
            onClick={() => isAuth && savePost()} 
            className="bg-light-theme-header text-white p-2 rounded-md">
            <FaRegHeart size={24} />
        </button>
    )
}

function RemoveSavedButton({ postId }: { postId: string }): React.ReactElement {
    const { mutateAsync: removeSavedPost } = useRemoveSavedPost(postId)

    return (
        <button 
            title="Remove the post from saved" 
            onClick={() => removeSavedPost()} 
            className="bg-light-theme-header text-white p-2 rounded-md">
            <FaHeart size={24} />
        </button>
    )
}

export { SaveButton, RemoveSavedButton }