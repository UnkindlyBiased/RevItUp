import { useState } from "react"
import useUserStore from "../store"
import { useShallow } from "zustand/react/shallow"
import Country from "../types/country/Country"

function LoginForm() {
    const [user, setUser] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const country: Country = {
        id: 1,
        name: "Ukraine",
        countryCode: "UA",
        flagImgLink: "https://catamphetamine.gitlab.io/country-flag-icons/3x2/UA.svg",
    }

    const actions = useUserStore(useShallow(
        (state) => ({
            login: state.login,
            registrate: state.registrate
        })
    ))

    return (
        <>
            <div className="flex flex-col space-y-5 bg-slate-500">
                <input placeholder="Username" value={user} className="px-3 py-2 rounded-md"
                    onChange={(e) => setUser(e.target.value)} />
                <input placeholder="Password" value={password} type="password" className="px-3 py-2 rounded-md"
                    onChange={(e) => setPassword(e.target.value)}/>
                <input placeholder="Email address" value={email} type="text" className="px-3 py-2 rounded-md"
                    onChange={(e) => setEmail(e.target.value)}/>
                <div className="flex justify-evenly space-x-8">
                    <button onClick={() => actions.login(user, password)}>Login</button>
                    <button onClick={() => actions.registrate({ 
                        username: user,
                        password,
                        emailAddress: email,
                        country
                     })}>Registrate</button>
                </div>
            </div>
        </>
    )
}

export default LoginForm