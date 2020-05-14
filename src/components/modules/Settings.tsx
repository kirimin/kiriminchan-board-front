import './Settings.css';
import * as React from 'react';
import { UserContext } from '../../contexts/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { AppHeader } from './AppHeader';
import { LoginHandler } from './LoginHandler';
import { deleteUser } from '../../apis/UserRepository';

export const Settings: React.FC<{}> = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  if (!user?.userId) {
    return <Redirect to={'/'}></Redirect>;
  }

  const onClickDelete = (): void => {
    (async function load(): Promise<void> {
      try {
        await deleteUser(user.userId);
        await firebaseApp.auth().currentUser?.delete();
        setUser(null);
        removeCookie('user');
      } catch (error) {
        alert(error.message);
      }
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
