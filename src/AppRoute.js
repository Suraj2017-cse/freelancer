import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/login'
import ForgetPassword from './components/forgotPassword'
import SignUp from './components/signUp'
import Dashboard from './components/dashboard'

const AppRoute = () => {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/forgetpassword',
            element: <ForgetPassword />
        },
        {
            path: '/signup',
            element: <SignUp />
        },
        {
            path: '/dashboard',
            element: <Dashboard />
        }
    ])
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  )
}

export default AppRoute