import './Settings.css';
import * as React from 'react';
import Axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { AppHeader } from './AppHeader';
import { LoginHandler } from './LoginHandler';

export const Settings: React.FC<{}> = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  if (!user?.userId) {
    return <Redirect to={'/'}></Redirect>;
  }

  const onClickDelete = (): void => {
    (async function load(): Promise<void> {
      await Axios.post('http://localhost:8080/api/deleteUser', {
        userId: user?.userId,
      });
      firebaseApp
        .auth()
        .currentUser?.delete()
        .then(function () {
          setUser(null);
          removeCookie('user');
        });
    })();
  };

  return (
    <div>
      <LoginHandler />
      <AppHeader isShowAccount={false} />
      <div className="settings_body">
        <div className="settings_delete_account">
          <button onClick={onClickDelete}>アカウントを削除する</button>
        </div>
      </div>
    </div>
  );
};
