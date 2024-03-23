import { useEffect, useMemo, useState } from "react"
import UserShort from "../../types/users/UserShort"
import UserService from "../../services/UserService"
import UserShortComp from "../components/users/UserElement"
import TestButton from "../components/default/TestButton"
import { SubmitHandler, useForm } from "react-hook-form"
import { TestInputButton } from "../components/default/TestInput"
import UserCreate from "../../types/users/UserCreate"
import { useNavigate } from "react-router-dom"
import Country from "../../types/country/Country"
import CountryService from "../../services/CountryService"
import UserRegisterInput from "../../types/users/UserRegisterInput"

// * Supposed to be badly written, for test purposes
// * If you are feeling anger 'cause of violating SRP in this code, just go outside and touch some grass

function TestUsersPage() {
    const [users, setUsers] = useState<UserShort[]>([])
    const { register, reset, handleSubmit } = useForm<UserRegisterInput>()

    const onSubmit: SubmitHandler<UserRegisterInput> = async (data) => {
        try {
            const userCreateData: UserCreate = {
                username: data.username,
                password: data.password,
                emailAddress: data.emailAddress,
                country: await CountryService.getCountryByCode(data.countryCode)
            }
            await UserService.create(userCreateData)
        } catch(e) {
            alert(e)
        } finally {
            reset()
        }
    }

    const [countries, setCountries] = useState<Country[]>()

    const getUsers = async () => {
        const fetchedUsers = await UserService.getUsers()
        if (fetchedUsers) {
            setUsers(fetchedUsers)
        }
    }
    useEffect(() => {
        async function getCountries() {
            try {
                const fetchedCountries = await CountryService.getCountries()
                setCountries(fetchedCountries)
            } catch(e) {
                console.log(e)
            }
        }
        getCountries()
    }, [])

    const memoizedUsers = useMemo(() => users, [users])

    const deleteUser = async (id: number) => {
        try {
            await UserService.delete(id)
            setUsers(memoizedUsers.filter(user => user.id != id))
        } catch (e) {
            console.log(e)
        }
    }

    const navigate = useNavigate()

    return (
        <div className="flex flex-col justify-start space-y-2">
            <span className="text-3xl font-bold">Users</span>
            <div className="flex items-center space-x-12">
                <TestButton onClick={getUsers}>Get users</TestButton>
                <div className="flex flex-col">
                    {memoizedUsers.map(user => (
                        <div className="flex items-center space-x-2" key={user.id}>
                            <UserShortComp user={user} onClick={() => {navigate(`/detailedUser/${user.username}`)}} />
                            <TestButton onClick={() => {
                                deleteUser(user.id)
                            }}>Delete</TestButton>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex flex-col w-fit space-y-3">
                        <input className="border-black border-2 rounded-md pl-2" {...register("username")}/>
                        <input className="border-black border-2 rounded-md pl-2" type="password" {...register("password")}/>
                        <input className="border-black border-2 rounded-md pl-2" {...register("emailAddress")}/>
                        <select {...register("countryCode")}>
                            {countries?.map(country => (
                                <option id={country.countryCode} key={country.id} value={country.countryCode}>
                                    {country.name}
                                </option>
                            ))}
                        </select>
                        <TestInputButton />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TestUsersPage