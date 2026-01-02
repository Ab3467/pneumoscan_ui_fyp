import { createContext, useState, useContext, useEffect } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check local storage for persisted user on mount
    const storedUser = localStorage.getItem("pneumoscan_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    // Simulate API call
    setUser(userData);
    localStorage.setItem("pneumoscan_user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("pneumoscan_user");
  };

  const signup = (userData) => {
    // Simulate API call
    setUser(userData);
    localStorage.setItem("pneumoscan_user", JSON.stringify(userData));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
