import './AppHeader.css';
import * as React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { UserContext, User } from '../../Context/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';

export const AppHeader: React.FC<{
  isShowAccount: boolean;
}> = ({ isShowAccount }) => {
  const { user, setUser } = React.useContext(UserContext);
  const [isLoginChanged, setIsLoginChanged] = React.useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);
  const history = useHistory();

  if (isLoginChanged) {
    return <Redirect to={'/'}></Redirect>;
  }

  function onClickLogout(): void {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        removeCookie('user');
        setIsLoginChanged(true);
      })
      .catch(function (error) {});
  }

  return (
    <div>
      <div className="app_header">
        <div className="app_header_contents">
          <h1 className="app_header_title">きりみんちゃん掲示板</h1>
          {isShowAccount && (
            <div className="app_header_account">
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
                    className="app_header_account_user_name"
                    onClick={(): void => history.push('/settings')}
                  >
                    {user.screenName}
                  </p>
                  <button onClick={onClickLogout}>ログアウト</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
