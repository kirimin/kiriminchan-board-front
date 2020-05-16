import * as React from 'react';
import './Comment.css';
import { CommentModel } from '../../models/CommentModel';
import { UserContext } from '../../contexts/UserContext';
import { deleteComment } from '../../apis/CommentRepository';

export const Comment: React.FC<{
  updateListener: Function | null;
  comment: CommentModel;
}> = ({ updateListener, comment }) => {
  const { user } = React.useContext(UserContext);
  const onClickDelete = (): void => {
    deleteComment(comment.commentId, user!.userId)
      .then(() => {
        updateListener ? updateListener() : null;
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="comment_parent">
      <p className="comment_header">
        {comment.commentNumber} {comment.createdUserName + '　'}
        {'id:' + comment.createdUserId + '　'}
        {comment.updatedAt}
      </p>
      <p className="comment_text">{comment.text}</p>
      {updateListener && user?.userId === comment.createdUserId && (
        <button onClick={onClickDelete}>コメント削除</button>
      )}
    </div>
  );
};
