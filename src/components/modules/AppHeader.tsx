import * as React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { LoginHandler } from './LoginHandler';
import { UserContext, User } from '../../Context/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';

export const AppHeader: React.FC<{}> = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);

  function onClickLogout(): void {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        removeCookie('user');
        return <Redirect to={'/'}></Redirect>;
      })
      .catch(function (error) {});
  }

  const history = useHistory();

  return (
    <div>
      <LoginHandler />
      <div className="top_header">
        <div className="top_header_contents">
          <h1 className="top_header_title">きりみんちゃん掲示板</h1>
          <div className="top_header_account">
            {user?.userId == null && (
              <button onClick={(): void => history.push('/signup')}>
                新規登録
              </button>
            )}
            {user?.userId == null && (
              <button onClick={(): void => history.push('/signin')}>
                ログイン
              </button>
            )}
            {user?.userId && (
              <div>
                <p
                  className="top_header_account_user_name"
                  onClick={(): void => history.push('/settings')}
                >
                  {user.screenName}
                </p>
                <button onClick={onClickLogout}>ログアウト</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
