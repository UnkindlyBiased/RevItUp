import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { useDocumentTitle } from "@uidotdev/usehooks"

import GenericButton from "@/components/generic/misc/input/GenericButton"
import UserCreate from "@/types/data/users/UserCreate"
import CountrySelect from "@/components/generic/misc/input/CountrySelect"
import { useCreateUser } from "@/hooks/useGetUsers"

// TODO: make beautiful register page
function RegisterPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Registration')

    const { register, setValue, watch, formState: { isValid } } = useForm<UserCreate>()
    const { mutateAsync: registrate } = useCreateUser(watch())

    return (
        <div className="flex flex-col justify-center items-center space-y-3">
            <span className="font-medium text-2xl" children='Registration' />
            <Input className="w-72" placeholder="Username" {...register('username', { required: true })} />
            <Input className="w-72" type="password" placeholder="Password" {...register('password', { required: true })} />
            <Input className="w-72" placeholder="Email address" {...register('emailAddress')} />
            <div className="w-72">
                <CountrySelect onValueChange={(value) => setValue('countryId', value)} />
            </div>
            <GenericButton children='Register' disabled={!(isValid && watch().countryId)} onClick={() => registrate()} />
        </div>
    )
}

export default RegisterPage