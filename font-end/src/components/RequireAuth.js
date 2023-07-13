import React from 'react'
import {Navigate,useLocation} from 'react-router-dom'
import {useAuth } from './auth'
export const RequireAuth = ({children}) => {
    const location = useLocation();
    const auth = useAuth()
    const token = localStorage.getItem('token')
    if(!token) {
        return <Navigate to="/login" state={{path: location.pathname }} />
    }
    return children
}

