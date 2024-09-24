import { Input } from "@/components/ui/input"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDocumentTitle } from "@uidotdev/usehooks"
import { useNavigate } from "react-router-dom"
import { useToast } from "../../components/ui/use-toast"

import GenericButton from "@/components/generic/misc/input/GenericButton"
import UserCreate from "@/types/data/users/UserCreate"
import CountrySelect from "@/components/generic/misc/input/CountrySelect"
import { useRegistrate } from "../../hooks/auth/useRegistrate"

function RegisterPage(): React.ReactElement {
    useDocumentTitle('REVITUP: Registration')

    const { register, setValue, watch, formState: { isValid }, handleSubmit } = useForm<UserCreate>()
    const { mutateAsync: registrate } = useRegistrate()
    const { toast } = useToast()
    const navigate = useNavigate()

    const onSubmit: SubmitHandler<UserCreate> = async (data) => {
        try {
            await registrate(data)

            toast({
                title: 'Registration was successful'
            })
            navigate('/login')
        } catch(e) {
            console.error(e)
        }
    }

    return (
        <form className="flex flex-col justify-center items-center space-y-3" onSubmit={handleSubmit(onSubmit)}>
            <span className="font-medium text-2xl" children='Registration' />
            <Input className="w-72" placeholder="Username" {...register('username', { required: true })} />
            <Input className="w-72" type="password" placeholder="Password" {...register('password', { required: true })} />
            <Input className="w-72" placeholder="Email address" {...register('emailAddress')} />
            <div className="w-72">
                <CountrySelect onValueChange={(value) => setValue('countryId', value)} />
            </div>
            <GenericButton children='Register' disabled={!(isValid && watch('countryId'))} type="submit" />
        </form>
    )
}

export default RegisterPage