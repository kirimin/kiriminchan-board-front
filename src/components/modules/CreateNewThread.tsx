import * as React from 'react';
import Axios from 'axios';
import { useForm } from 'react-hook-form';
import './CreateNewThread.css';
import { UserContext } from '../../Context/UserContext';

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
    (async function load() {
      const result = await Axios.post(
        'http://localhost:8080/api/createNewThread',
        {
          createdUserId: user?.userId,
          title: title,
          text: text,
        }
      );
      setValue('title', '');
      setValue('text', '');
      updateListener();
    })();
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
