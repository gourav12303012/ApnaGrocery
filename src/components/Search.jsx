import React, { useEffect, useState } from 'react'
import { IoSearchSharp } from "react-icons/io5";
import { useLocation, useNavigate } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { FaArrowLeft } from "react-icons/fa";
import useMobile from '../hooks/useMobile';
import { Link } from 'react-router-dom';

const Search = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const[isSearchPage,setIsSearchPage]=useState(false)
    const [isMobile] = useMobile()
    useEffect(()=>{
   const isSearch =location.pathname==="/search"
   setIsSearchPage(isSearch)
    },[location])

    const redirectToSearchPage = ()=>{
   navigate("/search")
    }
    console.log("Search",isSearchPage)

  return (
    <div className='w-full  min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500 bg-slate-50 group focus-within:border-yellow-500 '>
      <div>
  <div>
  

{
   (isMobile && isSearchPage) ?(<Link to={"/"} className='flex justify-center items-center h-full p-2 m-1 group-focus-within:text-yellow-800 bg-white rounded-full shadow-md' >
   <FaArrowLeft size={20}/>
 </Link>):(<button className='flex justify-center items-center h-full p-3 group-focus-within:text-yellow-800'>
  <IoSearchSharp size={23}/>
      </button>)
}
     
  </div>
      </div>
      <div className='w-full h-full'>
        {
        !isSearchPage?( 
                  /* Text Animation in search bar */
            // when i will not inside the search page
            <div onClick={redirectToSearchPage} className='w-full h-full flex items-center'>
            <TypeAnimation
        sequence={[
          // Same substring at the start will only be typed once, initially
          'Search "milk"',
          1000,
          'Search "bread"',
          1000,
          'Search "Sugar"',
          1000,
          'Search "Paneer"',
          1000,
          'Search "curd"',
          1000,
          'Search "sweets"',
          1000,
          'Search "rice"',
          1000,
          'Search "chicken"',
          1000,
          'Search "eggs"',
          1000,
          'Search "chips"',
          1000,
          'Search "flour"',
          1000,
          'Search "Grains"',
          1000,
          'Search "Vegetables"',
          1000,
        ]}
        speed={50}
        repeat={Infinity}
      />      </div>
        ):(  // when i will in the search page
            <div className='w-full h-full'>
                <input type='text' placeholder='Search for atta dal and more.' autoFocus={true}     className='bg-transparent w-full h-full outline-none'      />
            </div>
        )}
      </div>
    

    </div>
  )
}

export default Search
