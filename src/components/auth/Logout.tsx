import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../../interface/types";

const useLogout = (setUser: React.Dispatch<React.SetStateAction<User | null>>) => {
  const navigate = useNavigate();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('refresh_token');
    setUser(null); // ログアウト後にUIを即時更新するために、userステートも更新
    navigate('/')
  },[navigate, setUser]);

  return logout;
};

export default useLogout;