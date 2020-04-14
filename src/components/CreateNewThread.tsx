import * as React from "react";
import './CreateNewThread.css'

export const CreateNewThread: React.FC<{
}> = () => {
    const [count, setCount] = React.useState(0);
  
    return (
        <div className="create_new_thread_parent">
            <form>
                <h2>スレッドをつくる</h2>
                <div className="new_thread_input">
                    <p>タイトル</p>
                    <input className="create_new_thread_title" type="text" />
                    <p>本文</p>
                    <textarea className="create_new_thread_text"></textarea>
                </div>
                <button>投稿</button>
            </form>
        </div>
    );
  }