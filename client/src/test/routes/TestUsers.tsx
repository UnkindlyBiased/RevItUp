import { useState } from "react"
import { UserShort } from "../../types/UserShort"
import UserService from "../../services/UserService"
import UserShortComp from "../components/users/UserElement"
import TestButton from "../components/default/TestButton"
import { SubmitHandler, useForm } from "react-hook-form"
import { TestInputButton } from "../components/default/TestInput"
import { UserCreate } from "../../types/UserCreate"

// * Supposed to be badly written, for test purposes

function TestUsersPage() {
    const [users, setUsers] = useState<UserShort[]>([])
    const { register, reset, handleSubmit } = useForm<UserCreate>()
    const onSubmit: SubmitHandler<UserCreate> = async (data) => {
        try {
            await UserService.create(data)
        } catch(e) {
            alert(e)
        } finally {
            reset()
        }
    }

    const getUsers = async () => {
        const fetchedUsers = await UserService.getUsers()
        if (fetchedUsers) {
            setUsers(fetchedUsers)
        }
    }

    return (
        <div className="flex flex-col justify-start space-y-2">
            <span className="text-3xl font-bold">Users</span>
            <div className="flex items-center space-x-12">
                <TestButton onClick={getUsers}>Get users</TestButton>
                <div className="flex flex-col">
                    {users.map(user => (
                        <UserShortComp user={user} key={user.id} />
                    ))}
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-fit space-y-3">
                        <input className="border-black border-2 rounded-md pl-2" {...register("username")}/>
                        <input className="border-black border-2 rounded-md pl-2" type="password" {...register("password")}/>
                        <input className="border-black border-2 rounded-md pl-2" {...register("emailAddress")}/>
                        <TestInputButton />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TestUsersPage