// AuthContext.js
import React, { createContext, useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  // Check authentication using token
  const accessToken = localStorage.getItem("accessToken");
  const isAuthenticated = !!accessToken;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial state: not logged in

  const handleLogout = () => {
    // Perform the logout action
    fetch("https://foodie-bh1b.onrender.com/api/v1/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`, // Set the authorization header
        "Content-Type": "application/json", // Set other necessary headers if required
      },
    })
      .then((response) => {
        // Clear userData from localStorage
        localStorage.removeItem("accessToken");
        toast.success("Logged out successfully!");
        setIsLoggedIn(false);
        // Redirect to the login page or perform other actions after logout
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };
  const login = () => {
    // Implement your login logic here
    if (isAuthenticated) {
      setIsLoggedIn(true);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
