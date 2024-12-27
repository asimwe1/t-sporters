import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap the app and provide context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user data from localStorage or any other storage on app load
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (authToken) {
      // In this case, assuming the user data is also stored after login
      const userData = JSON.parse(localStorage.getItem("userData"));
      setUser({ authToken, ...userData });
    }
  }, []);

  // Login function
  const login = (authToken, userData) => {
    localStorage.setItem("authToken", authToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    setUser({ authToken, ...userData });
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
