import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { MdAddCircle, MdDelete, MdEdit, } from "react-icons/md"
import { useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"

import { useGetSchema } from "@/hooks/useColorMode"
import { useDeletePost, useEditPost, useGetPostById } from "@/hooks/useGetPosts"
import PostInput from "@/types/data/posts/PostInput"
import CategorySelect from "@/components/generic/category/CategorySelect"

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
                <DialogDescription>
                    <span>Remember that article's title should be unique</span>
                </DialogDescription>
                <DialogFooter></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EditAuthoredPost({ postId }: { postId: string }): React.ReactElement {
    const { register, setValue, watch } = useForm<PostInput>()
    const { data: postToEdit, refetch } = useGetPostById(postId)
    const { mutateAsync: editPost, isPending: isMutating, isSuccess } = useEditPost(postId, watch())

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
            { postToEdit && <DialogContent className="max-h-[90%] overflow-y-scroll">
                <DialogHeader className="font-medium text-xl">Edit the post</DialogHeader>
                <DialogDescription className="flex flex-col space-y-2">
                    <span>Post ID: {postId}</span>
                    <Textarea
                        {...register('postTitle', { required: true, minLength: 10 })}
                        className="text-black h-2"  
                        defaultValue={postToEdit.postTitle} />
                    <Textarea
                        {...register('previewText', { required: true })} 
                        className="text-black"
                        defaultValue={postToEdit.previewText} />
                    <Textarea
                        {...register('text', { required: true })}
                        className="text-black h-44"
                        defaultValue={postToEdit.text} />
                    <Textarea 
                        {...register('imageLink', { required: true })} 
                        defaultValue={postToEdit.imageLink} />
                    <CategorySelect onValueChange={(value) => setValue("categoryId", value) } />
                </DialogDescription>
                <DialogFooter>
                    { isMutating && <span className="opacity-50">Editing</span> }
                    { isSuccess && <span className="opacity-50">Successfully edited</span> }
                    <button className="mr-2" type="submit" onClick={() => editPost()}>
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