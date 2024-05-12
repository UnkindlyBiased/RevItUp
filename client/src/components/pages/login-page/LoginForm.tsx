import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

import CustomInput from "@/components/generic/CustomInput";
import useUserStore from "@/store/UserStore";
import UserLogin from "@/types/data/users/UserLogin";
import GenericButton from "@/components/generic/GenericButton";

function LoginForm(): React.ReactElement {
    const { register, handleSubmit, formState: { isValid } } = useForm<UserLogin>()
    const login = useUserStore(state => state.login)
    const navigate = useNavigate()
    
    // TODO: redo this crap (login)
    const onSubmit: SubmitHandler<UserLogin> = (data) => {
        try {
            login(data.username, data.password)
            navigate('/')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div className="flex justify-center items-center flex-col space-y-2 mt-4">
            <span className="font-medium text-2xl">Login</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-5 items-center">
                    <CustomInput placeholder="Username" {...register("username", { required: true })} />
                    <CustomInput placeholder="Password" type="password" {...register("password", { required: true })} />
                    <GenericButton disabled={!isValid} type="submit">Login</GenericButton>
                </div>
            </form>
        </div>
    )
}

export default LoginForm