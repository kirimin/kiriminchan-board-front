import * as React from "react";
import { Comment } from "./Comment";
import './ThreadSumally.css'

export const ThreadSumally: React.FC<{
    title: string
}> = ({title}) => {
    const [count, setCount] = React.useState(0);
  
    return (
      <div className="thread_sumally">
        <p className="thread_sumally_thread_header">{title} きりみんちゃん id:00001 2020/04/10 21:00</p>
        <div className="thread_sumally_comment_parent">
          <Comment text="テスト投稿です。テスト投稿です。" />
        </div>
        <div className="thread_sumally_comment_parent">
          <Comment text="最新のコメント。" />
        </div>
      </div>
    );
  }