import { refreshToken } from "../../../server/controllers/user.controller"

export const baseUrl="http://localhost:8080/"

const SummaryApi ={
    register:{
        url:'/api/user/register',
        method:'post'
    },
    login:{
        url:'/api/user/login',
        method:'post'
    },
    forgot_password:{
        url:'/api/user/forgot-password',
        method:'put'
    },
    verification_otp:{
        url:'/api/user/verify-forgot-password-otp',
        method:'put'
    },
    reset:{
        url:'/api/user/reset-password',
        method:'put'
    },
    refreshToken:{
        url:'/api/user/refresh-token',
        method:'post'
    }
}

export default SummaryApi