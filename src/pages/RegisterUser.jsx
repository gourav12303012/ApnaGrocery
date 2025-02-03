import React, { useState } from 'react'
import { FaEyeLowVision } from "react-icons/fa6";
import { FaEye } from "react-icons/fa6";
import toast from 'react-hot-toast';
import Axios from '../utils/Axios';
import SummaryApi from '../common/Summary';
import AxiosToastError from '../utils/AxiosToastError';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const RegisterUser = () => {
    const [data,setData]=useState({
        name:"",
        email:"",
        password:"",
        confirmPassword:""

    })

    const [showPassword,setShowPassword] = useState(false)
    const[showConfirmPassword,setShowConfirmPassword] =useState(false)
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

      if(data.password !== data.confirmPassword){
      toast.error("Password and Confirm Password must be same") 
      return }
   try{
      const response = await Axios({
        ...SummaryApi.register,
        data:data
      })
      if(response.data.error){
        toast.error(response.data.message)
      }
      if(response.data.success)
      {
        toast.success(response.data.message)
        setData({
          name:"",
          email:"",
          password:"",
          confirmPassword:""
        })
        navigate("/login")
      }
    }
      catch(error){
      AxiosToastError(error)
      }

    }
  return (
    <section className='w-full container mx-auto px-2'>
      <div className='bg-white my-4 w-full max-w-lg mx-auto rounded p-7'>
<p>Welcome to ApnaGrocery</p>

<form action="" className='grid gap-4 mt-6' onSubmit={handleSubmit}>
    <div className='grid gap-1'>
        <label htmlFor="name">Name :</label>
        <input type="text" placeholder='Enter Your Name' autoFocus name='name' id='name' className='bg-blue-50 p-2 border rounded outline-none focus:border-green-200' value={data.name} onChange={handleChange} />
    </div>
    <div className='grid gap-1'>
        <label htmlFor="email">Email :</label>
        <input type="email" placeholder='Enter Your Email' name='email' id='email' className='bg-blue-50 p-2 border rounded outline-none focus:border-green-200' value={data.email} onChange={handleChange} />
    </div>
    <div className='grid gap-1'>
        <label htmlFor="password">Password :</label>
  <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-200'> 
           <input placeholder='Enter Your Password' type={showPassword ? "text" : "password"} name='password' id='password' className='w-full outline-none' value={data.password} onChange={handleChange} />
  </div>
  <div onClick={()=>setShowPassword(prev=>!prev)} className='cursor-pointer'>
    {
        showPassword ? (<FaEye />
        ):(  <FaEyeLowVision />
        )
    }

  </div>
    </div>
    <div className='grid gap-1'>
        <label htmlFor="confirmPassword">Confirm Password :</label>
  <div className='bg-blue-50 p-2 border rounded flex items-center focus-within:border-green-200'> 
           <input placeholder='Enter Your Confirm Password' type={showConfirmPassword ? "text" : "password"} name='confirmPassword' id='confirmPassword' className='w-full outline-none' value={data.confirmPassword} onChange={handleChange} />
  </div>
  <div onClick={()=>setShowConfirmPassword(prev=>!prev)} className='cursor-pointer'>
    {
        showConfirmPassword ? (<FaEye />
        ):(  <FaEyeLowVision />
        )
    }
  </div>
    </div>

    <button disabled={!validevalue}   className={` ${validevalue ? "bg-green-800 hover:bg-green-600" : "bg-gray-500"} text-white
     py-2 rounded font-semibold my-3 leading-4 tracking-wide`}>Register</button>
</form>

<p>Already have account ?<Link to={"/login"} className='font-semibold text-green-900 hover:text-green-950'>Login</Link> </p>
      </div>
    </section>
  )
}

export default RegisterUser
