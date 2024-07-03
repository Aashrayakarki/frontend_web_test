import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {
   //get user data from local storage
   const user = JSON.parse(localStorage.getItem('userData'))

   //check user
   //check isAdmin == true
   //if true: Access all the routes of admin (Outlet)
   //if false: Navigate to login

   return user != null ?
   <Outlet/> : <Navigate to={'/login'}/>

}

export default UserRoutes
