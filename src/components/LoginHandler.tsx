import * as React from 'react';
import './SignIn.css';
import { UserContext } from '../Context/UserContext';
import { useCookies } from 'react-cookie';

export const LoginHandler: React.FC<{}> = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  const { setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    if (cookies.user) {
      setUser(cookies.user);
    }
  }, []);
  return null;
};
