import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser) {
        return children;
    }
  
    return <Navigate to="/login" replace/>
}

export default PrivateRoute