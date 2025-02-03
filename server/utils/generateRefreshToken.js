import userModel from "../model/user.model"
import jwt from 'jsonwebtoken'


const generateRefreshToken =async(userId)=>{
 const token = await jwt.sign({id: userId},process.env.SECRET_KEY_REFRESH_TOKEN,{expiresIn:'7d'})


 const updateRefreshTokenUser = await userModel.updateOne(
    {_id : userId},
    {
        refresh_token : token
    }
 )
  return token
}

export default generateRefreshToken