import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignIn.css';
import { UserContext } from '../../contexts/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';
import { Redirect } from 'react-router';
import { AppHeader } from '../modules/AppHeader';
import { updateUserToken, getUser } from '../../apis/UserRepository';

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
    (async function load(): Promise<void> {
      try {
        await firebaseApp.auth().signInWithEmailAndPassword(mail, pass);
        const user = firebaseApp.auth().currentUser;
        if (user) {
          const uid = user.uid;
          const token = await user.getIdToken();
          await updateUserToken(uid, token);
          const res = await getUser(uid);
          setCookie('user', res.data);
          setUser(res.data);
        }
      } catch (error) {
        alert(error.message);
      }
    })();
  });

  return (
    <div className="signin">
      <AppHeader isShowAccount={false} />
      <div className="signin_body">
        <form className="signin_form" onSubmit={onSubmit}>
          <h2>ログイン</h2>
          <div className="">
            <p>メールアドレス</p>
            <input type="mail" name="mail" ref={register({ required: true })} />
            <p>パスワード</p>
            <input
              type="password"
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
