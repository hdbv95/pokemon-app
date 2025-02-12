import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useUser } from "../../context/UserContext"

const Login = () => {
    const defualtLogin = {
        user: "admin",
        pass: "admin"
    }

    const { user, setUser } = useUser()
    const [username, setUsername] = useState("")
    const [pass, setPass] = useState("")
    const [badCreds, setBadCreds] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if (user) navigate("/")
    }, [user, navigate])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.type === "text") setUsername(e.target.value)
        if (e.target.type === "password") setPass(e.target.value)
    }

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (username === defualtLogin.user && pass === defualtLogin.pass) {
            setBadCreds(false)
            const loggedInUser = { name: username }
            localStorage.setItem('user', JSON.stringify(loggedInUser))
            setUser(loggedInUser)
            navigate("/")
            return
        }
        setBadCreds(true)
    }

    return (
        <div className="container space-y-4 max-w-sm">
            <form
                className="flex flex-col space-y-4 border-4 border-double p-4 w-full"
                onSubmit={handleLogin}
                aria-label="login-form"
                role="form"
            >
                <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="username" className="text-left">Username</label>
                    <input
                        id="username"
                        className="w-full border-2 border-double p-2"
                        type="text"
                        value={username}
                        onChange={handleChange}
                    />
                </div>
                <div className="flex flex-col space-y-2 w-full">
                    <label htmlFor="password" className="text-left">Password</label>
                    <input
                        id="password"
                        className="w-full border-2 border-double p-2"
                        type="password"
                        value={pass}
                        onChange={handleChange}
                    />
                </div>
                <button
                    className="bg-sky-500 text-white font-semibold py-2 px-6 rounded-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 cursor-pointer"
                    type="submit"
                >
                    Login
                </button>
            </form>
            {badCreds && <div className="text-red-500 text-center">Invalid user or password</div>}
        </div>
    )
}

export default Login