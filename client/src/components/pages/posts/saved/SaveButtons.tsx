import { FaHeart, FaRegHeart } from "react-icons/fa6"

import { useRemoveSavedPost, useSavePost } from "@/hooks/useGetPosts"
import useUserStore from "@/store/UserStore"

function SaveButton({ postId }: { postId: string }): React.ReactNode {
    const isAuth = useUserStore(state => state.isAuth)
    const { mutateAsync: savePost } = useSavePost(postId)

    return isAuth && (
        <button
            title="Save the post"
            onClick={() =>savePost()} 
            className="bg-light-theme-header text-white p-2 rounded-md">
            <FaRegHeart size={24} />
        </button>
    )
}

function RemoveSavedButton({ postId }: { postId: string }): React.ReactNode {
    const isAuth = useUserStore(state => state.isAuth)
    const { mutateAsync: removeSavedPost } = useRemoveSavedPost(postId)

    return isAuth && (
        <button 
            title="Remove the post from saved" 
            onClick={() => removeSavedPost()} 
            className="bg-light-theme-header text-white p-2 rounded-md">
            <FaHeart size={24} />
        </button>
    )
}

export { SaveButton, RemoveSavedButton }