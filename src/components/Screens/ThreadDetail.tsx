import './ThreadDetail.css';
import * as React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Comment } from '../modules/Comment';
import { CreateNewComment } from '../modules/CreateNewComment';
import { ThreadModel } from '../../models/ThreadModel';
import { UserContext } from '../../contexts/UserContext';
import { LoginHandler } from '../modules/LoginHandler';
import { AppHeader } from '../modules/AppHeader';
import { getThreadDetail } from '../../apis/ThreadRepository';

export const ThreadDetail: React.FC<{}> = () => {
  const [thread, setThread] = React.useState<ThreadModel>();
  const [isLoading, setIsLoading] = React.useState(true);
  const { user } = React.useContext(UserContext);
  const { id } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    if (isLoading) {
      getThreadDetail(id!).then((res) => {
        setThread(res.data);
        setIsLoading(false);
      });
    }
  });

  function updateListener(): void {
    if (!isLoading) {
      setIsLoading(true);
    }
  }
  if (isLoading) {
    return <div className="loader" />;
  }
  if (thread === undefined) {
    return <p>Thread Not found</p>;
  }
  return (
    <div className="thread_detail">
      <LoginHandler />
      <AppHeader isShowAccount={true} />
      <div className="thread_detail_body">
        <p className="thread_detail_body_title">{thread.title}</p>
        <div className="thread_detail_comments_parent">
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
        <button className="thread_detail_back_button" onClick={history.goBack}>
          戻る
        </button>
      </div>
    </div>
  );
};
