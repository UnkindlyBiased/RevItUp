import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"

import useUserStore from "@/store/UserStore"
import { useChangePfp } from "@/hooks/useGetUsers"

type UserPfpProps = {
    src: string | null
    userId: number
}

function UserPfp({ src, userId }: UserPfpProps) {
    const user = useUserStore(state => state.user)

    const { register, watch, formState: { isValid }, reset } = useForm<{ image: FileList }>()
    const { mutateAsync: upload, isPending } = useChangePfp({ 
        image: watch().image,
        id: userId
    })

    if (user?.id !== userId) return (
        <img className="rounded-md object-cover size-24 hover:size-32 transition-all" src={src || '/indian man.jpg'} />
    )

    return (
        <Dialog onOpenChange={() => reset()}>
            <DialogTrigger>
                <img className="rounded-md object-cover size-24 hover:size-32 transition-all" src={src || '/indian man.jpg'} />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="font-medium text-xl">
                    Change the profile picture
                </DialogHeader>
                <DialogDescription>
                    <Input {...register('image', { required: true })} type="file" />
                </DialogDescription>
                <DialogFooter className="flex items-center">
                    { isPending && <span className="opacity-50" children='Uploading' /> }
                    <button className="px-4 py-2 rounded-md disabled:opacity-50 transition-all" onClick={() => upload()} disabled={!isValid}>
                        Upload
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserPfp