import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTrigger } from "@/components/ui/dialog"
import { Edit2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Controller, useForm } from "react-hook-form"

import ActionButton from "@/components/generic/misc/input/ActionButton"
import CountrySelect from "@/components/generic/misc/input/CountrySelect"
import UserUpdateLight from "@/types/data/users/UserUpdateLight"
import { useUpdateUser } from "@/hooks/useGetUsers"

function UserEdit({ countryId }: { countryId: string }): React.ReactElement {
    const { register, watch, setValue, reset, formState: { isValid }, control } = useForm<UserUpdateLight>()
    const { mutateAsync: updateUser, isPending } = useUpdateUser(watch())

    return (
        <Dialog onOpenChange={() => reset()}>
            <DialogTrigger>
                <ActionButton icon={<Edit2 size={20} />} text="Edit data" />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader className="text-xl font-medium">
                    Edit the data
                </DialogHeader>
                <div className="space-y-2">
                    <Input {...register('username', { required: true, minLength: 10 })} placeholder="Your username" />
                    <Textarea {...register('biography', { required: true })} placeholder="Some text about yourself" />
                    <Controller 
                        name="countryId"
                        control={control}
                        defaultValue={countryId}
                        render={(({ ...field }) => (
                            <CountrySelect
                                {...field}
                                defaultValue={countryId.toString()}
                                onValueChange={(value) => setValue("countryId", value)} />
                        ))} />
                </div>
                <DialogFooter className="flex items-center">
                    { isPending && <span className="opacity-50" children="Updating" /> }
                    <button className="px-4 py-2 rounded-md disabled:opacity-50 transition-all" disabled={!(isValid && watch().countryId)} onClick={() => updateUser()}>
                        Upload
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default UserEdit