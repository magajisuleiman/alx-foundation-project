import React from "react"
import logo from "./assets/logo.svg"



function Register () {
  
  return (
    <div className="grid place-items-center bg-[url('./assets/login-pages.png')] h-screen bg-no-repeat bg-center bg-cover">     
      <div className="bg-white p-8 rounded shadow-md w-120">
        <div className="grid place-items-center">
          <div className="flex flex-col justify-center items-center">
            <img className="" src={ logo } alt="logo" width={ 60 } />
            <h3 className="m-3 font-karla text-brandColor font-thin">Healthy Food, Wealthy Lifestyle</h3>
          </div>
        </div>
        <h1 class="text-2xl font-semibold mb-4 mt-4">Create Account</h1>
        <form>
          <div className="flex gap-10">
            <div className="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">First Name</label>
                  <input type="text" id="username" name="username" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
              </div>
              <div className="mb-4">
                  <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
                  <input type="text" id="username" name="username" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Email</label>
                <input type="text" id="username" name="username" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
            </div>
            <div className="mb-4">
                <label for="username" class="block text-gray-700 text-sm font-bold mb-2">Phone Number</label>
                <input type="text" id="username" name="username" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mb-4">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
            </div>
            <div className="mb-4">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input type="password" id="password" name="password" class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"/>
            </div>
          </div>
          <button type="submit" class="w-auto  bg-brandColor text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue">Register</button>
        </form>

      </div>
    </div>
  ) 
}


export default Register