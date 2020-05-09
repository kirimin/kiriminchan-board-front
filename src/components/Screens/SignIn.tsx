import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { UserContext } from '../../Context/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { AppHeader } from '../modules/AppHeader';

type SignInForm = {
  mail: string;
  pass: string;
};

export const SignIn: React.FC<{}> = () => {
  const { register, setValue, handleSubmit, errors } = useForm<SignInForm>();
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  if (user?.userId) {
    return <Redirect to={'/'}></Redirect>;
  }
  const onSubmit = handleSubmit(({ mail, pass }) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then((res) => {
        const user = firebaseApp.auth().currentUser;
        if (user) {
          const uid = user.uid;
          (async function load(): Promise<void> {
            const getUserRes = await Axios(
              'http://localhost:8080/api/getUser/' + uid
            );
            setCookie('user', getUserRes.data);
            setUser(getUserRes.data);
          })();
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  });

  return (
    <div className="signin">
      <AppHeader isShowAccount={false} />
      <div className="signin_body">
        <form className="signin_form" onSubmit={onSubmit}>
          <h2>ログイン</h2>
          <div className="">
            <p>メールアドレス</p>
            <input
              type="mail"
              className=""
              name="mail"
              ref={register({ required: true })}
            />
            <p>パスワード</p>
            <input
              type="password"
              className=""
              name="pass"
              ref={register({ required: true })}
            ></input>
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};
