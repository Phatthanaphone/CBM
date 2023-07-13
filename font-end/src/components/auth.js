import React from 'react'

import { useState,createContext,useContext} from 'react'

const AuthContext = createContext(null)

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)

    const login = async (user) => {
    //    const token =  await localStorage.getItem('token')
        setUser(user)
    }
    const logout = ( ) => {
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{user, login, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}