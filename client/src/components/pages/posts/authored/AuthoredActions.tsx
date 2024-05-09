import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { MdAddCircle, MdDelete, MdEdit, } from "react-icons/md"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

import { useGetSchema } from "@/hooks/useColorMode"
import { useDeletePost, useEditPost, useGetPostById } from "@/hooks/useGetPosts"
import PostInput from "@/types/data/posts/PostInput"

function AddNewPost(): React.ReactElement {
    return (
        <Dialog>
            <DialogTrigger className="text-white bg-light-theme-header h-fit px-4 py-3 rounded-lg flex space-x-2 items-center">
                <MdAddCircle size={20} />
                <span className="font-medium">Add a post</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-xl font-medium">
                    Add new post
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

function EditAuthoredPost({ postId }: { postId: string }): React.ReactElement {
    const { register, setValue, watch } = useForm<PostInput>()
    const { data: postToEdit, refetch } = useGetPostById(postId)
    const { mutateAsync: editPost, isPending: isMutating } = useEditPost(postId, watch())

    const handleOpenChange = () => {
        for (const key in postToEdit) {
            setValue(key as keyof PostInput, postToEdit[key as keyof PostInput])
        }
    }

    return (
        <Dialog onOpenChange={handleOpenChange}>
            <DialogTrigger className="cursor-pointer" onClick={() => refetch()}>
                <MdEdit size={24} />
            </DialogTrigger>
            { postToEdit && <DialogContent>
                <DialogHeader className="font-medium text-xl">Edit the post</DialogHeader>
                <DialogDescription className="flex flex-col space-y-2">
                    <span>Post ID: {postId}</span>
                    <Textarea {...register('postTitle')} defaultValue={postToEdit.postTitle} />
                    <Textarea className="text-black" {...register('previewText')} defaultValue={postToEdit.previewText} />
                    <Textarea className="text-black h-44" {...register('text')} defaultValue={postToEdit.text} />
                    <Textarea {...register('imageLink')} defaultValue={postToEdit.imageLink} />
                </DialogDescription>
                <DialogFooter>
                    { isMutating && <span className="opacity-50">Editing</span> }
                    <button type="submit" onClick={() => { editPost(); editPost() }}>
                        Save changes
                    </button>
                </DialogFooter>
            </DialogContent> }
        </Dialog>
    )
}

function DeleteAuthoredPost({ postId }: { postId: string }): React.ReactElement {
    const schema = useGetSchema()
    const { mutateAsync: deletePost } = useDeletePost(postId)

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <MdDelete size={24} />
            </AlertDialogTrigger>
            <AlertDialogContent className={cn(schema.secondaryBgColor, schema.border, schema.defaultFontColor)}>
                <AlertDialogHeader className="text-xl font-medium">
                    Before deleting this post
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action can't be undone. Think twice before doing that. All comments referenced to this post will be deleted
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel className={cn(schema.secondaryBgColor)}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className={cn(schema.primaryBgColor, "text-white py-2 px-4 rounded-md")} onClick={() => deletePost()}>
                        Delete post
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export { AddNewPost, EditAuthoredPost, DeleteAuthoredPost }