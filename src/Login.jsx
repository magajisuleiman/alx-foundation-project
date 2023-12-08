import React, { useState, useEffect } from "react";
import logo from "./assets/logo.svg";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = {
        email: email,
        password: password,
      };

      console.log("Login data:", data);

      const response = await fetch(
        "https://foodie-bh1b.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await response.json();

      if (response.ok) {
        const accessToken = responseData.userData.accessToken;

        // Store the access token in local storage
        localStorage.setItem("accessToken", accessToken);

        // Handle successful login
        toast.success("Login successful");
        console.log("Login successful!");
        // Redirect or perform necessary actions upon successful login
      } else {
        // Handle failed login
        toast.error(`Login failed: ${responseData.message}`);
        console.error("Login failed:", response.statusText);
        console.log("Login failed!", responseData);
        // You might want to show an error message to the user here
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Handle other potential errors here
    }
  };
  return (
    <div className="grid place-items-center bg-[url('./assets/login-pages.png')] h-screen bg-no-repeat bg-center bg-cover">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <div className="grid place-items-center">
          <div className="flex flex-col justify-center items-center">
            <img className="" src={logo} alt="logo" width={60} />
            <h3 className="m-3 font-karla text-brandColor font-thin">
              Healthy Food, Wealthy Lifestyle
            </h3>
          </div>
        </div>
        <h1 class="text-2xl font-semibold mb-4 mt-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
              onChange={handleEmailChange}
              placeholder="Enter your email address"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              class="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
              onChange={handlePasswordChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            class="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </button>
          <div class="flex justify-between mt-4 text-center">
            <a href="#" class="text-brandColor hover:underline">
              Forgot Password?
            </a>
            <a href="/register" class="text-brandColor hover:underline">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
