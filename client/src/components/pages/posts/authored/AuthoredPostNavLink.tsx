import {  useState } from "react";
import { cn } from "@/lib/utils";
import Marquee from "react-fast-marquee";

import { useGetSchema } from "@/hooks/useColorMode";
import PostPreview from "@/types/data/posts/PostPreview";
import { DeleteAuthoredPost, EditAuthoredPost } from "./AuthoredActions";

function AuthoredPostNavLink({ post, onClick }: { post: PostPreview, onClick: () => void }): React.ReactElement {
    const [isHovered, setIsHovered] = useState(false)
    const schema = useGetSchema()

    return (
        <div className={cn("text-white rounded-lg flex items-center justify-between space-x-4 w-[35rem] w px-4 py-3 cursor-pointer", schema.primaryBgColor)} 
            onMouseEnter={() => setIsHovered(true)} 
            onMouseLeave={() => setIsHovered(false)}>
            <div className="flex flex-col space-y-1 w-full" onClick={onClick}>
                <Marquee play={isHovered}>
                    <span className="text-lg font-bold">{post.postTitle}</span>
                </Marquee>
                <span>Category: <b>{post.category.categoryName}</b></span>
            </div>
            <div className="flex flex-col space-y-2">
                <EditAuthoredPost postId={post.id} />
                <DeleteAuthoredPost postId={post.id} />
            </div>
        </div>
    )
}

export default AuthoredPostNavLink