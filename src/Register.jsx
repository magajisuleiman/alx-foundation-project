import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./assets/logo.svg";
import { toast } from "react-toastify";

function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);

  const checkEmailExists = async (inputEmail) => {
    try {
      const response = await fetch(
        "https://foodie-bh1b.onrender.com/api/v1/auth/check-email",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: inputEmail }),
        }
      );

      const data = await response.json();
      console.log("Email exists:", data.emailExists);

      setEmailExists(data.emailExists);
    } catch (error) {
      console.error("Error checking email:", error);
    }
  };

  useEffect(() => {
    if (email.trim() !== "") {
      checkEmailExists(email);
    } else {
      // Reset emailExists state if the email input is empty
      setEmailExists(false);
    }
  }, [email]);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
  };
  // To check if the password is valid, we need to check if it meets the following conditions:
  // - More than 6 characters
  // - Contains at least one letter
  // - Contains at least one number
  // - same as confirm password
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Check if password meets conditions: > 6 characters, has letter and number
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
    setPasswordValid(passwordRegex.test(newPassword));
  };

  const handleConfirmPasswordChange = (event) => {
    const newConfirmPassword = event.target.value;
    setConfirmPassword(newConfirmPassword);

    // Check if confirm password matches the main password
    setPasswordMatch(newConfirmPassword === password);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Prepare data object with form values
      const data = {
        email: email,
        first_name: firstName, // Use the state variable directly
        last_name: lastName, // Use the state variable directly
        phone_number: phoneNumber,
        password: password,
      };

      console.log("Registration data:", data);

      const response = await fetch(
        "https://foodie-bh1b.onrender.com/api/v1/auth/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // If registration is successful, route the user to the login page
        navigate("/login");
        toast.success("Success. Proceed to Login");
        console.log("Registration successful!");
      } else {
        // If there's an error, display the error message as a modal
        // You might want to handle the modal logic using state variables
        // For simplicity, here's a console log of the error response
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
        toast.error("Error. Please try again");
        // Display error message as a modal or other UI component
        // Implement your logic to show the error message to the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Error. Please try again");
      // Handle other potential errors here
    }
  };

  return (
    <div className="grid place-items-center bg-[url('./assets/login-pages.png')] h-screen bg-no-repeat bg-center bg-cover">
      <div className="bg-white p-8 rounded shadow-md w-120">
        <div className="grid place-items-center">
          <div className="flex flex-col justify-center items-center">
            <img className="" src={logo} alt="logo" width={60} />
            <h3 className="m-3 font-karla text-brandColor font-thin">
              Healthy Food, Wealthy Lifestyle
            </h3>
          </div>
        </div>
        <h1 class="text-2xl font-semibold mb-4 mt-4">Create Account</h1>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-10">
            <div className="mb-4">
              <label
                htmlFor="firstName"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handleFirstNameChange}
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="lastName"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handleLastNameChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-10">
            <div className="mb-4">
              <label
                htmlFor="email"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handleEmailChange}
                required
              />
              {emailExists && (
                <p className="text-red-500 text-xs mt-1">
                  Email already exists please use another.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="phoneNumber"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phoneNumber"
                name="phoneNumber"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handlePhoneNumberChange}
                required
              />
            </div>
          </div>
          <div className="flex gap-10">
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
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handlePasswordChange}
                required
              />
              {!passwordValid && (
                <p className="text-red-500 text-xs mt-1">
                  Password must be <br />
                  more than 6 characters
                  <br />
                  <b /> and contain a letter and a number.
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                class="block text-gray-700 text-sm font-bold mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                class="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-brandColor"
                onChange={handleConfirmPasswordChange}
                required
              />
              {!passwordMatch && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match.
                </p>
              )}
            </div>
          </div>
          <button
            type="submit"
            class="w-auto  bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
            disabled={!passwordValid || !passwordMatch || emailExists}
          >
            Register
          </button>
          <a
            href="/login"
            class="w-auto  bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue"
          >
            Login
          </a>
        </form>
      </div>
    </div>
  );
}

export default Register;
