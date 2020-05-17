import './Top.css';
import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { ThreadSumally } from '../modules/ThreadSumally';
import { CreateNewThread } from '../modules/CreateNewThread';
import { ThreadModel } from '../../models/ThreadModel';
import { LoginHandler } from '../modules/LoginHandler';
import { UserContext } from '../../contexts/UserContext';
import { AppHeader } from '../modules/AppHeader';
import { getThreadSummary } from '../../apis/ThreadRepository';

export const Top: React.FC = () => {
  const [threads, setThreads] = React.useState<Array<ThreadModel>>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const { user, setUser } = React.useContext(UserContext);

  React.useEffect(() => {
    if (isLoading) {
      getThreadSummary().then((res) => {
        setThreads(res.data);
        setIsLoading(false);
      });
    }
  });

  function updateListener(): void {
    if (!isLoading) {
      setIsLoading(true);
    }
  }

  const history = useHistory();

  if (isLoading) {
    return <div className="loader" />;
  }

  return (
    <div className="top">
      <LoginHandler />
      <AppHeader isShowAccount={true} />
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
