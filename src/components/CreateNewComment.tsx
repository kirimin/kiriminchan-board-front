import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './CreateNewThread.css';

type CreateCommentRequest = {
  threadId: string;
  text: string;
};

export const CreateNewComment: React.FC<{
  updateListener: Function;
  threadId: number;
}> = ({ updateListener, threadId }) => {
  const { register, setValue, handleSubmit, errors } = useForm<
    CreateCommentRequest
  >();
  const onSubmit = handleSubmit(({ text }) => {
    (async function load() {
      const result = await Axios.post(
        'http://localhost:8080/api/createNewComment',
        {
          createdUserId: 1,
          threadId: threadId,
          text: text,
        }
      );
      setValue('text', '');
      updateListener();
    })();
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
