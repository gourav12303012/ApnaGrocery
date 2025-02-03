
import React, { useState } from 'react'
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/Summary';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
    const [data,setData]=useState({
        email:"",

    })

    const navigate = useNavigate()
    const handleChange=(e)=>{
   const{name,value}= e.target
   setData((prev)=>{
    return {
        ...prev,
        [name]:value
    }
   })
    }
    // console.log("data",data)

    const validevalue=Object.values(data).every(e1=>e1)

    const handleSubmit = async(e)=>{
      e.preventDefault()

     
   try{
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data:data
      })
      if(response.data.error){
        toast.error(response.data.message)
      }
      if(response.data.success)
      {
        toast.success(response.data.message)
        navigate("/verification-otp",{
          state:data
        })
        setData({
          email:"",
        })
        
      }
    }
      catch(error){
      AxiosToastError(error)
      }

    }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
 <p className='font-semibold text-lg '>Forgot Passsword</p>
<form action="" className='grid gap-4 py-4' onSubmit={handleSubmit}>
  
    <div className='grid gap-1'>
        <label htmlFor="email">Email :</label>
        <input type="email" placeholder='Enter Your Email' name='email' id='email' className='bg-blue-50 p-2 border rounded outline-none focus:border-green-200' value={data.email} onChange={handleChange} />
    </div>
    
   

    <button disabled={!validevalue}   className={` ${validevalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"} text-white
     py-2 rounded font-semibold my-3 leading-4 tracking-wide`}>Login</button>
</form>

<p>Already have account ? <Link to={"/login"} className='font-semibold text-green-900 hover:text-green-950'>Send OTP</Link> </p>
      </div>
    </section>
  )
}

export default ForgotPassword
