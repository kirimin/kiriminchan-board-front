import * as React from 'react';
import Axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';
import { Comment } from './Comment';
import { CreateNewComment } from './CreateNewComment';
import { ThreadModel } from '../models/ThreadModel';
import './threadDetail.css';
import { UserContext } from '../Context/UserContext';
import { LoginHandler } from './LoginHandler';

export const ThreadDetail: React.FC<{}> = () => {
  const [thread, setThread] = React.useState<ThreadModel>();
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();
  React.useEffect(() => {
    if (isLoading) {
      (async function load(): Promise<void> {
        console.log('load');
        const result = await Axios(
          'http://localhost:8080/api/getThreadDetail/' + id
        );
        setThread(result.data);
      })();
      setIsLoading(false);
    }
  });
  function updateListener(): void {
    if (!isLoading) {
      setIsLoading(true);
    }
  }
  if (thread === undefined) {
    return <p>Thread Not found</p>;
  }
  return (
    <div className="thread_detail">
      <LoginHandler />
      <p className="thread_sumally_thread_header">{thread.title}</p>
      <div className="thread_sumally_comment_parent">
        {
          <ul>
            {thread.comments.map((comment) => {
              return (
                <Comment
                  key={comment.commentId}
                  comment={comment}
                  updateListener={updateListener}
                />
              );
            })}
          </ul>
        }
      </div>
      {user?.userId && (
        <CreateNewComment
          updateListener={updateListener}
          threadId={thread.threadId}
        />
      )}
      <button onClick={history.goBack}>戻る</button>
    </div>
  );
};
