import { useUser } from "../../context/UserContext"
import logoutIcon from "../../assets/logoutIcon.svg"

const Logout = () => {
    const { logout } = useUser()

    return (
        <div className="flex justify-end p-4">
            <button
                className="bg-red-400 hover:bg-red-500 text-black px-4 py-2 rounded-md shadow-md flex items-center space-x-2"
                onClick={logout}
            >
                <img src={logoutIcon} alt="Logout" className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
        </div>
    )
}

export default Logout
