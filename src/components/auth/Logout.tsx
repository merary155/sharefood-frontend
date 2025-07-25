const logout = (navigate: (path: string) => void) => {
  localStorage.removeItem('token');
  navigate('/')
}

export default logout;

// 下のコードと同じ意味、useは関数の中でしか使えない

/*
---------------------------------------
import { useNavigate } from 'react-router-dom';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  }
  return logout;
};

export default useLogout;
---------------------------------------
*/