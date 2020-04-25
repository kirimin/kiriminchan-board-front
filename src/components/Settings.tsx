import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { UserContext } from '../Context/UserContext';
import { firebaseApp } from '../firebase';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';

type SettingsForm = {};

export const Settings: React.FC<{}> = () => {
  const { register, setValue, handleSubmit, errors } = useForm<SettingsForm>();
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
          // User deleted.
        });
      setUser(null);
      removeCookie('user');
    })();
  };

  return (
    <div>
      <button onClick={onClickDelete}>アカウントを削除する</button>
    </div>
  );
};
