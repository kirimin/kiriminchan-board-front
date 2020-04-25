import * as React from 'react';
import { Comment } from './Comment';
import { ThreadModel } from '../models/ThreadModel';
import { UserContext, User } from '../Context/UserContext';
import './ThreadSumally.css';
import Axios from 'axios';

export const ThreadSumally: React.FC<{
  thread: ThreadModel;
  updateListener: Function;
}> = ({ thread, updateListener }) => {
  const { user, setUser } = React.useContext(UserContext);
  const onClickDelete = () => {
    (async function load() {
      const result = await Axios.post(
        'http://localhost:8080/api/deleteThread',
        {
          threadId: thread.threadId,
        }
      );
      updateListener ? updateListener() : null;
    })();
  };

  return (
    <div className="thread_sumally">
      <p className="thread_sumally_thread_header">
        {thread.title} {thread.createdUserName} {thread.createdAt}
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
        {user?.userId === thread.createdUserId && (
          <button onClick={onClickDelete}>削除</button>
        )}
      </div>
    </div>
  );
};
