import * as React from "react";
import { Comment } from "./Comment";
import { ThreadModel } from "../models/ThreadModel";
import './ThreadSumally.css'

export const ThreadSumally: React.FC<{
    thread: ThreadModel
}> = ({thread}) => {
  
    return (
      <div className="thread_sumally">
        <p className="thread_sumally_thread_header">{thread.title} {thread.createdUserName} {thread.createdAt }</p>
        <div className="thread_sumally_comment_parent">
          <Comment key="top" comment={thread.comments[0]} />
          { thread.comments.length >= 2 && ( <Comment key="latest" comment={thread.comments[thread.comments.length - 1]}></Comment> ) }
        </div>
      </div>
    );
  }