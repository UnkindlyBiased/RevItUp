import { useNavigate, useParams } from "react-router-dom"
import { UserDetailed } from "../../types/users/UserDetailed"
import { H1 } from "../components/default/TestHeaderTags"
import { useEffect, useState } from "react"
import UserService from "../../services/UserService"
import { UserEdit } from "../../types/users/UserEdit"
import { SubmitHandler, useForm } from "react-hook-form"
import { TestInputButton } from "../components/default/TestInput"

function TestUserDetailedPage() {
    const { username } = useParams()
    const [userData, setUserData] = useState<UserDetailed>()
    const navigate = useNavigate()
    const { register, handleSubmit, reset } = useForm<UserEdit>()
    const updateSubmitHandler: SubmitHandler<UserEdit> = async (data) => {
        try {
            await UserService.update(userData!.id, data)
            navigate(`/detailedUser/${data.username}`)
        } catch (e) {
            console.log(e) 
        } finally {
            reset()
        }
    }

    useEffect(() => {
        async function getData() {
            try {
                if (!username) {
                    throw new Error("Username was not given")
                }
                const fetchedUser = await UserService.getUserByUsername(username)
                setUserData(fetchedUser)
            } catch (e) {
                console.log(e)
            }
        }
        getData()
    }, [username])

    if (userData) {
        return (
            <>
                <div className="flex justify-between">
                    <div className="flex flex-col size-fit space-y-2">
                        <H1>{userData.username}</H1>
                        <span>{userData.biography}</span>
                        <span>{`${new Date(userData.registrationDate).toUTCString()}`}</span>
                    </div>
                    <form className="flex flex-col space-y-3" onSubmit={handleSubmit(updateSubmitHandler)}>
                        <input className="border-black border-2 rounded-md pl-2" {...register("username")}/>
                        <input className="border-black border-2 rounded-md pl-2" type="password" {...register("password")}/>
                        <input className="border-black border-2 rounded-md pl-2" {...register("emailAddress")}/>
                        <textarea className="border-black border-2 rounded-md pl-2" {...register("biography")} />
                        <TestInputButton />
                    </form>
                </div>
            </>
        )
    }
}

export default TestUserDetailedPage