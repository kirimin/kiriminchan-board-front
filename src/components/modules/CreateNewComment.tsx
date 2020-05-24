import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './CreateNewThread.css';
import { createNewComment } from '../../apis/CommentRepository';
import { UserContext } from '../../contexts/UserContext';

type CreateCommentRequest = {
  threadId: string;
  text: string;
};

export const CreateNewComment: React.FC<{
  updateListener: Function;
  threadId: number;
}> = ({ updateListener, threadId }) => {
  const { user } = React.useContext(UserContext);
  const { register, setValue, handleSubmit, errors } = useForm<
    CreateCommentRequest
  >();
  const onSubmit = handleSubmit(({ text }) => {
    if (text.length > 5000) {
      alert('コメントが長すぎます。5000文字以内にしてね。');
      return;
    }
    createNewComment(threadId, user!.userId, text)
      .then(() => {
        setValue('text', '');
        updateListener();
      })
      .catch((error) => {
        alert(error.message);
      });
  });
  return (
    <div className="create_new_thread_parent">
      <form onSubmit={onSubmit}>
        {setValue('createUserId', 1)}
        <h2>コメントする</h2>
        <div className="new_thread_input">
          <textarea
            className="create_new_thread_text"
            name="text"
            ref={register({ required: true })}
          ></textarea>
        </div>
        <input type="submit" />
      </form>
    </div>
  );
};
