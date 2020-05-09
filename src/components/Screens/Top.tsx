import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/analytics';
import * as React from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';
import { ThreadSumally } from '../modules/ThreadSumally';
import { CreateNewThread } from '../modules/CreateNewThread';
import { ThreadModel } from '../../models/ThreadModel';
import { LoginHandler } from '../modules/LoginHandler';
import './Top.css';
import { UserContext, User } from '../../Context/UserContext';
import { firebaseApp } from '../../firebase';
import { useCookies } from 'react-cookie';
import { AppHeader } from '../modules/AppHeader';

export const Top: React.FC = () => {
  const [threads, setThreads] = React.useState<Array<ThreadModel>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserContext);
  const [cookies, setCookie, removeCookie] = useCookies(['login-cookie']);

  React.useEffect(() => {
    if (isLoading) {
      (async function load(): Promise<void> {
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

  const history = useHistory();

  return (
    <div className="top">
      <LoginHandler />
      <AppHeader />
      <div className="top_body">
        {user?.userId && <CreateNewThread updateListener={updateListener} />}
        <div className="top_threads_header">
          <h2 className="top_threads_header_title">スレッド一覧</h2>
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
    </div>
  );
};
