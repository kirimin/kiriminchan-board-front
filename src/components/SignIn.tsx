import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { UserContext } from '../Context/UserContext';
import { firebaseApp } from '../firebase';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

type SignInForm = {
  mail: string;
  pass: string;
};

export const SignIn: React.FC<{}> = () => {
  const { register, setValue, handleSubmit, errors } = useForm<SignInForm>();
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  if (user?.userId) {
    useHistory().push('/');
  }
  const onSubmit = handleSubmit(({ mail, pass }) => {
    firebaseApp
      .auth()
      .signInWithEmailAndPassword(mail, pass)
      .then((res) => {
        const user = firebaseApp.auth().currentUser;
        if (user) {
          const uid = user.uid;
          (async function load() {
            const getUserRes = await Axios(
              'http://localhost:8080/api/getUser/' + uid
            );
            setCookie('user', getUserRes.data, { path: '/' });
            setUser(getUserRes.data);
          })();
        }
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
          alert('The password is too weak.');
        } else {
          alert(errorMessage);
        }
      });
  });

  return (
    <div className="signin">
      <form onSubmit={onSubmit}>
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
  );
};