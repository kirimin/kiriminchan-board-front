import * as React from "react";
import Axios from "axios";
import { useForm } from 'react-hook-form'
import './CreateNewThread.css';

type CreateThreadRequest = {
    title: string;
    text: string;
}

export const CreateNewThread: React.FC<{
    updateListener: Function
}> = ({updateListener}) => {
    const { register, setValue, handleSubmit, errors } = useForm<CreateThreadRequest>();
    const onSubmit = handleSubmit(({ title, text }) => {
        (async function load() {
            const result = await Axios.post(
                'http://localhost:8080/api/createNewThread', {
                    createdUserId: 1,
                    title: title,
                    text: text
                }
            );
            setValue("title", "");
            setValue("text", "");
            updateListener();
        })()
        
    });
    return (
        <div className="create_new_thread_parent">
            <form onSubmit={onSubmit}>
                { setValue("createUserId", 1)}
                <h2>スレッドをつくる</h2>
                <div className="new_thread_input">
                    <p>タイトル</p>
                    <input className="create_new_thread_title" name="title" ref={register({ required: true})} />
                    <p>本文</p>
                    <textarea className="create_new_thread_text" name="text" ref={register({ required: true})} ></textarea>
                </div>
                <input type="submit" />
            </form>
        </div>
    );
  }