import sendEmail from '../config/sendEmail.js'
import UserModel from '../model/user.model.js'
import bcryptjs from 'bcryptjs'
import verifyEmailTemplate from '../utils/verifyEmailTemplate.js'
import userModel from '../model/user.model.js'
import generateAccessToken from '../utils/generateAccessToken.js'
import upload from '../middleware/multer.js'
import uploadImageClodinary from '../utils/uploadImageClodinary.js'
import generateOtp from '../utils/generateOtp.js'
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js'
import jwt from 'jsonwebtoken'
export async function registerUserController(request,response){
    try{
         const {name,email,password} = request.body
        // let name = "Gaurav"
        // let email = "gourav12303012@gmail.com"
        // let password = "123456"

         if(!name || !email || !password)
         {
            return response.status(400).json({
                message:"provide email , name , password",
                error:true,
                success:false
            })
         }
         const user = await UserModel.findOne({email})
         if(user){
            return response.json({
                message:"Already registered email",
                error:true,
                success: false
            })
         }
     const salt = await bcryptjs.genSalt(10)
     const hashPassword = await bcryptjs.hash(password,salt)
      
    const payload ={
        name,
        email,
        password : hashPassword
    }
    const newUser = new UserModel(payload)
    const save = await newUser.save()
    const verifyEmailUrl =`${process.env.FRONTEND_URL}/verify-email?code=${save._id}`
    const verifyEmail = await sendEmail({
        sendTo : email,
        subject:"Verify email from ApnaGrocery",
        html: verifyEmailTemplate({
            name,
            url: verifyEmailUrl
        })
    })

    return response.json({
        message:"User registered Successfully",
        error:false,
        success:true,
        data:save
    })
    }
    catch(error){
        return response.status(500).json({
            message:error.message || error,
            error : true,
            success : false
        })
    }

}

export async function verifyEmailController(request,response){
    try{
        const {code} = request.body

        const user = await UserModel.findOne({_id : code})

        if(!user){
       return response.status(400).json(
        {
            message : "Invalid code ",
            error : true,
            success:false
        }
       )
        }

        const updateUser = await UserModel.updateOne({_id:code},{
            verify_email :true
        })
     return response.json({
        message: "verify email done",
        success:true,
        error:false
     })

    }catch(error){
      return response.status(500).json({
        message: error.message || error,
        error : true,
        success: true
      })
    }
}


// login COntroller

export async function loginController(request,response) {
    try{
       const {email,password}=request.body

       if(!email || !password){
        return response.status(400).json({
            message : "Provide email or Password",
            error : true,
            success:false
        })
       }
       const user = await userModel.findOne({email})
       if(!user){
        return response.status(400).json({
            message:"User not registered",
            error:true,
            success:false
        })
       }
 
       if(user.status !== "Active"){
        return response.status(400).json({
            message:"Contact to Admin",
            error : true,
            success: false
        })
       }
       

       const checkPassword = await bcryptjs.compare(password,user.password)

       if(!checkPassword){
        return response.status(400).json({
            message: "Check your password",
            error:true,
            success:false
        })
       }

   const accesstoken = await generateAccessToken(user._id)
   const refreshToken =await generateAccessToken(user._id)
    const cookiesOption ={
        httpOnly: true,
        secure : true,
        sameSite:"None"
    }
    response.cookie('accessToken',accesstoken,cookiesOption)
    response.cookie('refreshToken',refreshToken,cookiesOption)
   

   return response.json({
    message:"Login successfully",
    error :false,
    success:true,
    data:{
        accesstoken , refreshToken
    }
   })
    }catch(error)
    {
        return response.status(500).json({
            message: error.message || error,
            error : true,
            success: false 
        })
    }
    
}

// logout controller 

export async function logoutController(request,response) {
    try{
        const userId = request.userId //middleware
        const cookiesOption ={
            httpOnly: true,
            secure : true,
            sameSite:"None"
        }

   response.clearCookie("accessToken",cookiesOption)
   response.clearCookie("refreshToken",cookiesOption)

   const removeRefreshToken = await UserModel.findByIdAndUpdate(userId,{refresh_token:""})

    return response.json({
        message:"Logout Successfully",
        error:false,
        success:true
    })
   
    }catch(error)
    {
   return response.status(500).json({
    message:error.message|| error,
    error:true,
    success:false
   })
    }
    
}

// Upload user Avtar 

export async function uploadAvtar(request,response) {
    try{
        const userId = request.userId// This id is coming from auth middleware
        const image= request.file//This image is coming from multer middle ware
    const upload = await uploadImageClodinary(image)
        // console.log("image",image)

        const updateUser = await userModel.findByIdAndUpdate(userId,{
            avtar:upload.url
        })
        return response.json({
            message:"Upload Profile",
            data: {
                _id:userId,
                avtar:upload.url

            }
        })
    }
    catch(error){
        return response.status(500).json({
            message:error.message|| error,
            error:true,
            success: false
        })
    }
    
}

// Update user details

export async function updateUserDetails(request,response) {
try{
    const userId = request.userId // This is coming from auth middleware
    const {name ,email,mobile,password}=request.body
   let hashPassword =" "
    if(password){
        const salt = await bcryptjs.genSalt(10)
         hashPassword = await bcryptjs.hash(password,salt)
    }

    const updateUser = await userModel.updateOne({_id : userId},{
        ...(name &&{name:name }),
        ...(email&&{email:email }),
        ...(mobile&&{mobile:mobile }),
        ...(password&&{password:hashPassword }),
    })

    return response.json({
        message:"Updated user Successfully",
        error:false,
        success:true,
        data:updateUser
    })
}catch(error){
    return response.status(500).json({
    message: error.message || error,
    error:true,
    success:false
    })    
  }

}

// Forgot Password not login

export async function forgotPasswordController(request,response) {
    try{
         const {email}=request.body
         const user = await userModel.findOne({email})

         if(!user){
          return  response.status(400).json({
                message:"Email not available",
                error:true,
                success:false
            })
         }
         const otp = generateOtp()
         const expireTime = new Date() + 60 * 60 * 1000 ///it coverts to 1 hour

         const update = await userModel.findByIdAndUpdate(user._id,{
            forgot_password_otp : otp,
            forgot_password_expiry : new Date(expireTime).toISOString()
         })
         await sendEmail({
            sendTo : email,
            subject:"Forgot password from apnabazar",
            html : forgotPasswordTemplate({name :user.name,
                otp:otp
            })
         })

         return response.json({
            message:"Check your email",
            error:false,
            success:true
         })
    }
    catch(error){
        return response.status(500).json({
            message:error.message||error,
            error:true,
            success:false
        })
    }
    
}

// verify forgot password otp

export async function verifyForgotPasswordOtp(request,response) {
    try{
      const {email , otp} =  request.body

      const user = await userModel.findOne({email})
    if(!email || !otp){
        return response.status(400).json({
            message: "Provide required field email,otp .",
            error : true,
            success:false
        })
    }
       
        const currentTime = new Date().toISOString()


      if(!user){
       return  response.status(400).json({
             message:"Email not available",
             error:true,
             success:false
         })
      }

      
      
      if(user.forgot_password_expiry < currentTime){
        return response.status(400).json({
            message:"Otp is expired",
            error:true,
            success:false
        })
    }

    if(otp !== user.forgot_password_otp){
     return response.status(400).json({
        message:"Invalid Otp",
        error:true,
        success:false
     })
    }

    // if otp is not expired
    // otp=== user.forgot_password_otp

    return response.json({
        message:"Verify Otp successfully",
        error:false,
        success:true
    })

    }catch(error)
    {
        return response.status(500).json({
            message:error.message || error,
            error: true,
            success:false
        })
    }
    
}

// Reset password
export async function resetPassword(request,response) {
    try{
      const{email, newPassword , confirmPassword} = request.body

      if(!email || !newPassword || !confirmPassword)
      {
        return response.status(400).json({
            message:"Provide required fields email, newPassword , confirmPassword"
        })
      }

      const user = await userModel.findOne({email})

      if(!user){
        return response.status(400).json({
            message:"Email is not available",
            error:true,
            success:false
        })
      }

      if(newPassword !== confirmPassword){
        return response.status(400).json({
            message:"New Password and Confirm password Must be Same.",
            error:true,
            success:false
        })
      }

      const salt = await bcryptjs.genSalt(10)
    const  hashPassword = await bcryptjs.hash(newPassword,salt)

      const update=await userModel.findOneAndUpdate(user,{
        password: hashPassword
      })
      return response.json({
        message:"Password Updated Successfully",
        error:false,
        success:true
      })

    }catch(error){
        return response.status(500).json({
  message:error.message || error,
  error:true,
  success:false
        })
    }
    
}

// Refresh token controller

export async function refreshToken(request,response) {
    try{
  const refreshToken = request.cookies.refreshToken || request?.header?.authorization?.split(" ")[1]
  if(!refreshToken){
    return response.status(402).json({
        message:"Unauthorized access",
        error:true,
        success:false
    })
  }
   const verifyToken = await jwt.verify(refreshToken,process.env.SECRET_KEY_REFRESH_TOKEN)

 if(!verifyToken){
    return response.status(401).json({
    message:"Token is expired",
    error:true,
    success:false
    })
 }
 console.log("verify Token",verifyToken)
   const userId = verifyToken._id

 const newAccessToken = await generateAccessToken(userId)

 const cookiesOption ={
    httpOnly: true,
    secure : true,
    sameSite:"None"
}

 response.cookies('accessToken',newAccessToken)

 return response.json({
    message: "New Access token generated",
    error:false,
    success:true,
    data:{
        accesstoken : newAccessToken
    }
 })

    }catch(error)
    {
        return response.status(500).json({
            message:error.message || error,
            error:true,
            success:false
        })
    }
    
}