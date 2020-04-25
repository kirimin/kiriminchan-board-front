import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import * as React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreadSumally } from './ThreadSumally';
import { CreateNewThread } from './CreateNewThread';
import { ThreadModel } from '../models/ThreadModel';
import { LoginHandler } from './LoginHandler';
import './Top.css';
import { UserContext, User } from '../Context/UserContext';
import { firebaseApp } from '../firebase';
import { useCookies } from 'react-cookie';

export const Top: React.FC = () => {
  const [threads, setThreads] = React.useState<Array<ThreadModel>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);

  React.useEffect(() => {
    if (isLoading) {
      (async function load(): Promise<void> {
        console.log('load');
        const result = await Axios(
          'http://localhost:8080/api/getThreadsSumally'
        );
        setThreads(result.data);
      })();
      setIsLoading(false);
    }
  });

  function updateListener(): void {
    if (!isLoading) {
      setIsLoading(true);
    }
  }

  function onClickLogout(): void {
    firebaseApp
      .auth()
      .signOut()
      .then(function () {
        setUser(null);
        removeCookie('user');
      })
      .catch(function (error) {});
  }

  const history = useHistory();

  return (
    <div>
      <LoginHandler />
      <div className="top_header">
        <h1>きりみんちゃん掲示板</h1>
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
            <p onClick={(): void => history.push('/settings')}>
              {user.screenName}
            </p>
            <button onClick={onClickLogout}>ログアウト</button>
          </div>
        )}
      </div>
      {user?.userId && <CreateNewThread updateListener={updateListener} />}
      <div className="top_threads_header">
        <h2>スレッド一覧</h2>
      </div>
      {threads.map((item: ThreadModel) => (
        <div
          key={item.threadId}
          className="top_thread_sumally_parent"
          onClick={(): void => history.push('/thread/' + item.threadId)}
        >
          <ThreadSumally
            key={item.threadId}
            thread={item}
            updateListener={updateListener}
          />
        </div>
      ))}
    </div>
  );
};
