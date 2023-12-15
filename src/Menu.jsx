import React from 'react'
import Navbar from './NavBar'
import rice from "./assets/jolof.png"
import swallo from "./assets/Swallo.png"
import beans from "./assets/beans.png"
import soups from "./assets/soup.png"
import beverages from "./assets/beverages.png"
import spaghetti  from "./assets/spagetti.png"
import deserts from "./assets/desert.png"



function Menu () {
  return (
    <div className='flex mx-auto p-10 gap-8 justify-around'>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl rounded-md hover:cursor-pointer'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ rice } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1 '>RICE</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ swallo } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Swallo</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ beans } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Beans</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ soups } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Soups</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ beverages } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Beverages</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ spaghetti } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Spaghetti</h3>
      </div>
      <div className='flex flex-col w-32 h-32 border shadow hover:shadow-2xl hover:cursor-pointer rounded-md'>
        <img className='min-w-full h-4/5 rounded-t-md' src={ deserts } alt="rice" />
        <h3 className='text-brandColor text-center font-bold font-mono p-1'>Deserts</h3>
      </div>
    </div>
    
  )
}
export default Menu