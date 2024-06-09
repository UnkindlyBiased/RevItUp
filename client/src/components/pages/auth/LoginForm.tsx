import { SubmitHandler, useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";

import useUserStore from "@/store/UserStore";
import UserLogin from "@/types/data/users/UserLogin";
import GenericButton from "@/components/generic/misc/input/GenericButton";

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
        <div className="flex justify-center items-center flex-col space-y-3">
            <span className="font-medium text-2xl">Login</span>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col space-y-5 items-center">
                    <Input className="w-72" placeholder="Username" {...register("username", { required: true })} />
                    <Input className="w-72" placeholder="Password" type="password" {...register("password", { required: true, minLength: 8 })} />
                    <GenericButton disabled={!isValid} type="submit">Login</GenericButton>
                </div>
            </form>
            <div className="space-x-1">
                <span>First time here?</span>
                <Link className="font-bold hover:underline" to={'/register'}>Why not registrating?</Link>
            </div>
        </div>
    )
}

export default LoginForm