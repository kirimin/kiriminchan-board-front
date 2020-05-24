import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './CreateNewThread.css';
import { UserContext } from '../../contexts/UserContext';
import { createNewThread } from '../../apis/ThreadRepository';

type CreateThreadRequest = {
  title: string;
  text: string;
};

export const CreateNewThread: React.FC<{
  updateListener: Function;
}> = ({ updateListener }) => {
  const { register, setValue, handleSubmit, errors } = useForm<
    CreateThreadRequest
  >();
  const { user } = React.useContext(UserContext);
  const onSubmit = handleSubmit(({ title, text }) => {
    if (title.length > 1000) {
      alert('タイトルが長すぎます。1000文字以内にしてね。');
      return;
    }
    if (text.length > 5000) {
      alert('本文が長すぎます。5000文字以内にしてね。');
      return;
    }
    createNewThread(user!.userId, title, text)
      .then(() => {
        setValue('title', '');
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
        <h2>スレッドをつくる</h2>
        <div className="new_thread_input">
          <p>タイトル</p>
          <input
            className="create_new_thread_title"
            name="title"
            ref={register({ required: true })}
          />
          <p>本文</p>
          <textarea
            className="create_new_thread_text"
            name="text"
            ref={register({ required: true })}
          ></textarea>
        </div>
        <input type="submit" value="作成する！" />
      </form>
    </div>
  );
};
