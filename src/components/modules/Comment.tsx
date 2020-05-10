import * as React from 'react';
import './Comment.css';
import { CommentModel } from '../../models/CommentModel';
import Axios from 'axios';
import { UserContext } from '../../Context/UserContext';

export const Comment: React.FC<{
  updateListener: Function | null;
  comment: CommentModel;
}> = ({ updateListener, comment }) => {
  const { user } = React.useContext(UserContext);
  const onClickDelete = (): void => {
    (async function load(): Promise<void> {
      await Axios.post('http://localhost:8080/api/deleteComment', {
        commentId: comment.commentId,
      });
      updateListener ? updateListener() : null;
    })();
  };

  return (
    <div className="comment_parent">
      <p className="comment_header">
        {comment.commentNumber} {comment.createdUserName} {comment.updatedAt}
      </p>
      <p className="comment_text">{comment.text}</p>
      {updateListener && user?.userId === comment.createdUserId && (
        <button onClick={onClickDelete}>コメント削除</button>
      )}
    </div>
  );
};
