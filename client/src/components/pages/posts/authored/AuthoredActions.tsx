import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTrigger } from "@/components/ui/alert-dialog"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { MdAddCircle, MdDelete, MdEdit, } from "react-icons/md"
import { Controller, useForm } from "react-hook-form"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { useDebounce } from "@uidotdev/usehooks"

import { useCheckByTitle, useCreatePost, useDeletePost, useEditPost, useGetPostById } from "@/hooks/useGetPosts"
import PostInput from "@/types/data/posts/PostInput"
import CategorySelect from "@/components/generic/category/CategorySelect"

function AddNewPost(): React.ReactElement {
    const { register, setValue, watch, reset, formState: { isValid } } = useForm<PostInput>()
    const { mutateAsync: createPost, isPending: isAdding } = useCreatePost(watch())

    const debouncedTitle = useDebounce(watch().postTitle, 500)
    const { data: isTitleNotUnique, isLoading: weAreChecking } = useCheckByTitle(debouncedTitle)

    return (
        <Dialog onOpenChange={() => reset()}>
            <DialogTrigger className="text-white bg-light-theme-header h-fit px-4 py-3 rounded-lg flex space-x-2 items-center">
                <MdAddCircle size={20} />
                <span className="font-medium">Add a post</span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-xl font-medium">
                    Add new post
                    <DialogDescription>Remember that article's title should be unique</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <>
                        <Textarea
                            {...register('postTitle', { required: true, minLength: 15 })}
                            placeholder="Article's title" />
                        { isTitleNotUnique && <span className="text-red-600">Post with this title already exists, try again</span> }
                    </>
                    <Textarea
                        {...register('previewText', { required: true })}
                        placeholder="Article's placeholder text. Should be short and engaging" />
                    <Textarea
                        {...register('text', { required: true })}
                        placeholder="Article's text" />
                    <Input type="file"
                        {...register('postImage', { required: true })} />
                    <CategorySelect
                        onValueChange={(value) => setValue('categoryId', value)} />
                </div>
                <DialogFooter className="flex items-center">
                    { isAdding && <span className="opacity-50">Adding</span> }
                    <button className="px-4 py-2 rounded-md disabled:opacity-50 transition-all" onClick={() => createPost()} disabled={!(isValid && watch().categoryId) || isTitleNotUnique || weAreChecking}>
                        Add post
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

function EditAuthoredPost({ postId }: { postId: string }): React.ReactElement {
    const { register, setValue, watch, reset, formState: { isValid }, control } = useForm<PostInput>()

    const { data: postToEdit, refetch } = useGetPostById(postId)
    const { mutateAsync: editPost, isPending: isMutating } = useEditPost(postId, watch())

    const [isNewPhoto, setIsNewPhoto] = useState(false)

    return (
        <Dialog onOpenChange={() => { reset(); setIsNewPhoto(false) }}>
            <DialogTrigger className="cursor-pointer" onClick={() => refetch()}>
                <MdEdit size={24} />
            </DialogTrigger>
            { postToEdit && <DialogContent className="max-h-[90%]">
                <DialogHeader className="font-medium text-xl">
                    Edit the Post
                    <DialogDescription>Post ID: {postId}</DialogDescription>
                </DialogHeader>
                <div className="flex flex-col space-y-2">
                    <Textarea
                        {...register('postTitle', { required: true, minLength: 10 })}
                        defaultValue={postToEdit.postTitle} />
                    <Textarea
                        {...register('previewText', { required: true })} 
                        defaultValue={postToEdit.previewText} />
                    <Textarea
                        {...register('text', { required: true })}
                        defaultValue={postToEdit.text} />
                    <div className="flex space-x-2 items-center">
                        <Checkbox className="transition-all" checked={isNewPhoto} onCheckedChange={() => setIsNewPhoto(!isNewPhoto)} />
                        <Input type="file"
                            accept=".png, .jpg, .jpeg, .webp"
                            disabled={!isNewPhoto}
                            className="transition-all"
                            {...register('postImage', { required: isNewPhoto })} />
                    </div>
                    <Controller
                        control={control}
                        name="categoryId"
                        defaultValue={postToEdit.category.id.toString()}
                        render={(({ ...field }) => (
                            <CategorySelect
                                {...field}
                                defaultValue={postToEdit.category.id.toString()}
                                onValueChange={(value) => setValue("categoryId", value)} />
                        ))}/>
                </div>
                <DialogFooter className="flex items-center">
                    { isMutating && <span className="opacity-50">Editing</span> }
                    <button className="px-4 py-2 rounded-md disabled:opacity-50 transition-all" onClick={() => editPost()} disabled={!isValid || (isNewPhoto && !watch().postImage)}>
                        Save changes
                    </button>
                </DialogFooter>
            </DialogContent> }
        </Dialog>
    )
}

function DeleteAuthoredPost({ postId }: { postId: string }): React.ReactElement {
    const { mutateAsync: deletePost } = useDeletePost(postId)

    return (
        <AlertDialog>
            <AlertDialogTrigger>
                <MdDelete size={24} />
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader className="text-xl font-medium">
                    Before deleting this post
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This action can't be undone. Think twice before doing that. All comments referenced to this post will be deleted
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={() => deletePost()}>
                        Delete post
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export { AddNewPost, EditAuthoredPost, DeleteAuthoredPost }