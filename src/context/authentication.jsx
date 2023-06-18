import { createContext, useEffect, useState } from "react";
import UserAPI from "@/api/user";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routes/paths";

export const AuthenticationContext = createContext();

function AuthenticationContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate(`/${Paths.LOGIN}`);
  };

  const login = async (token) => {
    setLoading(true);

    localStorage.setItem("token", token);
    try {
      const { data } = await UserAPI.userDetail();
      setUser(data?.data);
      console.log(data);
      navigate(`/${Paths.DASHBOARD}`);
      setLoading(false);
      return;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const restoreData = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      const { data } = await UserAPI.userDetail();
      setUser(data?.data);
    } catch (error) {
      console.log(error);
      navigate(`/${Paths.LOGIN}`);
    }

    setLoading(false);
  };

  useEffect(() => {
    restoreData();
  }, []);

  return (
    <AuthenticationContext.Provider
      value={{ user, setUser, login, loading, logout }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationContextProvider;
