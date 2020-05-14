import * as React from 'react';
import { Comment } from './Comment';
import { ThreadModel } from '../../models/ThreadModel';
import { UserContext, User } from '../../contexts/UserContext';
import './ThreadSumally.css';
import { deleteThread } from '../../apis/ThreadRepository';

export const ThreadSumally: React.FC<{
  thread: ThreadModel;
  updateListener: Function;
}> = ({ thread, updateListener }) => {
  const { user } = React.useContext(UserContext);
  const onClickDelete = (event: any) => {
    event.stopPropagation();
    deleteThread(thread.threadId, user!.userId)
      .then(() => {
        updateListener ? updateListener() : null;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="thread_sumally">
      <p className="thread_sumally_thread_header">{thread.title}</p>
      <p>
        {thread.createdUserName} {'id:' + thread.createdUserId + '　'}{' '}
        {thread.createdAt}
      </p>
      <div className="thread_sumally_comment_parent">
        <Comment key="top" comment={thread.comments[0]} updateListener={null} />
        {thread.comments.length >= 2 && (
          <Comment
            key="latest"
            comment={thread.comments[thread.comments.length - 1]}
            updateListener={null}
          ></Comment>
        )}
      </div>
      {user?.userId === thread.createdUserId && (
        <div className="thread_sumally_delete">
          <button onClick={onClickDelete}>スレッド削除</button>
        </div>
      )}
    </div>
  );
};
