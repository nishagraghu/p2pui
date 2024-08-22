import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import apiHelper, { setAuthToken } from "../helpers/apiHelper";

const useAuth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/authentication/sign-in");
        return;
      }
      console.log("token", token);
      setAuthToken(token);

      try {
        if (!token) {
          logout();
        }
        await apiHelper.post("auth/validate", { token });
      } catch (error) {
        logout();
      }
    };

    checkAuth();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    // apiHelper.getProtected(
    //   "http://localhost:3001/api/v1/auth/logout",
    //   {
    //     refreshToken: localStorage.getItem("refreshToken"),
    //   },
    //   "post"
    // );
    setAuthToken(null);
    navigate("/authentication/sign-in");
  };

  return { logout };
};

export default useAuth;
