import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './SignUp.css';
import { UserContext } from '../Context/UserContext';
import { firebaseApp } from '../firebase';
import { useCookies } from 'react-cookie';
import { useHistory } from 'react-router';

type SignUpForm = {
  mail: string;
  pass: string;
  name: string;
};

export const SignUp: React.FC<{}> = () => {
  const { register, setValue, handleSubmit, errors } = useForm<SignUpForm>();
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);

  if (user?.userId) {
    useHistory().push('/');
  }

  const onSubmit = handleSubmit(({ mail, pass, name }) => {
    firebaseApp
      .auth()
      .createUserWithEmailAndPassword(mail, pass)
      .then((res) => {
        if (res.user) {
          const uid = res.user.uid;
          (async function load() {
            await Axios.post('http://localhost:8080/api/createNewUser', {
              name: name,
              firebaseUid: uid,
            });
            const getUserRes = await Axios(
              'http://localhost:8080/api/getUser/' + uid
            );
            setUser(getUserRes.data);
            setCookie('user', getUserRes.data);
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
    <div className="signup">
      <form onSubmit={onSubmit}>
        <h2>新規登録</h2>
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
          <p>表示名</p>
          <input
            type="name"
            className=""
            name="name"
            ref={register({ required: true })}
          ></input>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
