import { useState } from "react";
import AuthContext from "./authContext";

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(() => {
    const savedToken = localStorage.getItem("cp_token");
    const savedUser = localStorage.getItem("cp_user");
    if (savedToken && savedUser) {
      return { token: savedToken, user: JSON.parse(savedUser) };
    }
    return { token: null, user: null };
  });

  const login = (userData, accessToken) => {
    localStorage.setItem("cp_token", accessToken);
    localStorage.setItem("cp_user", JSON.stringify(userData));
    setAuth({ user: userData, token: accessToken });
  };

  const logout = () => {
    localStorage.removeItem("cp_token");
    localStorage.removeItem("cp_user");
    setAuth({ user: null, token: null });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}