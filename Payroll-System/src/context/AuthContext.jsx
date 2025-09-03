// src/context/AuthContext.jsx

import { jwtDecode } from "jwt-decode";

import { createContext, useState, useEffect ,useContext} from "react";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({
          token,
          role: decoded.role,
          username: decoded.sub,
          userId: decoded.userId,
        });
      } catch (err) {
        console.error("Invalid token:", err);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser({
      token,
      role: decoded.role,
      username: decoded.sub,
      userId: decoded.userId,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

 export const useAuth = () => useContext(AuthContext);