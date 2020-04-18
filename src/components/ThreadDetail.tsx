import * as React from "react";
import Axios from "axios";
import {
    BrowserRouter as Router,
    Route,
    Switch,
    useParams,
    useHistory,
    useLocation,
  } from 'react-router-dom';
import { Comment } from "./Comment";
import { ThreadModel } from "../models/ThreadModel";
import './threadDetail.css'

export const ThreadDetail: React.FC<{
}> = () => {
    const [thread, setThread] = React.useState<ThreadModel>();
    const [isLoading, setIsLoading] = React.useState(true);
    const { id } = useParams();
    React.useEffect(() => {
        if (isLoading) {
            (async function load() {
                console.log("load")
                const result = await Axios(
                    'http://localhost:8080/api/getThreadDetail/' + id);
                setThread(result.data);
            })()
            setIsLoading(false);
        }
    });
    if (thread === undefined) {
        return <p>Thread Not found</p>
    }

    return (
      <div className="thread_detail">
        <p className="thread_sumally_thread_header">{thread.title}</p>
        <div className="thread_sumally_comment_parent">
            {
                <ul>
                    {thread.comments.map((comment) => {
                        return <Comment key={comment.commentId} comment={comment} />
                    })}
                    
                </ul>
            }
        </div>
      </div>
    );
  }

  export function Child() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    console.log(useLocation());
    let { id } = useParams();
  
    return (
      <div>
        <h3>ID: {id}</h3>
      </div>
    );
  }