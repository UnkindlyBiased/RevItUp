import CustomInput from "@/components/generic/misc/CustomInput";
import useUserStore from "@/store/UserStore";
import UserLogin from "@/types/data/users/UserLogin";
import { SubmitHandler, useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";

function LoginForm(): React.ReactElement {
    const { register, handleSubmit } = useForm<UserLogin>()
    const login = useUserStore(state => state.login)
    const navigate = useNavigate()
    
    const onSubmit: SubmitHandler<UserLogin> = (data) => {
        try {
            login(data.username, data.password)
            navigate('/')
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <>
            <div className="flex justify-center items-center flex-col space-y-2 mt-4">
                <span className="font-medium text-2xl">Login</span>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col space-y-5 items-center">
                        <CustomInput placeholder="Username" {...register("username")} />
                        <CustomInput placeholder="Password" type="password" {...register("password")} />
                        <button type="submit" className="size-fit px-4 py-2 rounded-lg font-semibold">Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default LoginForm