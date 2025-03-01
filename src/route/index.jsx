import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import RegisterUser from "../pages/RegisterUser";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification";
import ResetPassword from "../pages/ResetPassword"

const router = createBrowserRouter([
    {
        path : "/",
        element:<App/>,
        children:[
            {
               path:"",
               element: <Home/>
            },
            {
               path:"search",
               element: <SearchPage/>
            },
            {
               path:"login",
               element: <Login/>
            },
            {
               path:"Register",
               element: <RegisterUser/>
            },
            {
               path:"forgot-password",
               element: <ForgotPassword/>
            },
            {
               path:"verification-otp",
               element: <OtpVerification/>
            },
            {
               path:"reset-password",
               element: <ResetPassword/>
            },
        ]
    }
])

export default router