import { createContext, useState, ReactNode, useContext, useEffect } from 'react'

interface User {
    name: string
}

interface UserContextType {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
    logout: () => void
}

const defaultContextValue: UserContextType = {
    user: null,
    setUser: () => { },
    logout: () => { }
}

const UserContext = createContext<UserContextType>(defaultContextValue)

interface UserProviderProps {
    children: ReactNode
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null)
    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        }
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem('user', JSON.stringify(user))
        }
    }, [user])

    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }


    return (
        <UserContext.Provider value={{ user, setUser, logout }}>
            {children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)
