import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { MdAddCircle } from "react-icons/md"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useForm } from "react-hook-form"

import ActionButton from "@/components/generic/misc/input/ActionButton"
import { useCreateThread } from "@/hooks/useThreads"
import ThreadInput from "@/types/data/threads/ThreadInput"
import ThreadCategoriesSelect from "./ThreadCategoriesSelect"

function AddThread(): React.ReactElement {
    const { register, setValue, watch, reset, formState: { isValid } } = useForm<ThreadInput>()
    const { mutateAsync: addThread, isPending: isAdding } = useCreateThread(watch())

    return (
        <Dialog onOpenChange={() => reset()}>
            <DialogTrigger>
                <ActionButton icon={<MdAddCircle size={20} />} text="Add thread" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-xl font-medium">
                    Add new thread
                    <DialogDescription>Minimum of 10 symbols for the title</DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Input
                        {...register('threadTitle', { required: true, minLength: 10 })}
                        placeholder="Thread title" />
                    <Textarea 
                        {...register('threadText', { required: true })}
                        placeholder="Thread text" />
                    <ThreadCategoriesSelect onValueChange={(value) => setValue('threadCategoryId', value)} />
                </div>
                <DialogFooter className="flex items-center">
                    { isAdding && <span className="opacity-50">Adding</span> }
                    <button className="px-4 py-2 rounded-md disabled:opacity-50 transition-all" onClick={() => addThread()} disabled={!(isValid && watch().threadCategoryId)}>
                        Add post
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export { AddThread }