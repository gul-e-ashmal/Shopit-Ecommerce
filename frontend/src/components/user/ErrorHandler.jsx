import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';
import Loader from "../layouts/Loader"

const ErrorHandler = ({admin, children}) => {

    const {isAuthenticated,user,isLoading}=useSelector((state)=>state.auth);

    if(isLoading){
        return(
            <Loader />
        )
    }

    if(!isAuthenticated){
        return (
            <Navigate to={"/login"} replace/>
          )
    }

    if(admin && user.role!=="admin"){
        return (
            <Navigate to={"/"} replace/>
          )
    }

    return children
  
}

export default ErrorHandler