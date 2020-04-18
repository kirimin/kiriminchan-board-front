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
import { ThreadSumally } from "./ThreadSumally"
import { CreateNewThread } from "./CreateNewThread"
import { ThreadModel } from "../models/ThreadModel"
import './Top.css'

export const Top: React.FC = () => {
    const [threads, setThreads] = React.useState<Array<ThreadModel>>( [] );
    const [isLoading, setIsLoading] = React.useState(true);
  
    React.useEffect(() => {
        if (isLoading) {
            (async function load() {
                console.log("load")
                const result = await Axios(
                    'http://localhost:8080/api/getThreadsSumally'
                );
                setThreads(result.data);
            })()
            setIsLoading(false);
        }
    });

    function updateListener() {
        console.log("updateListener")
        if (!isLoading) {
            console.log("isLoading:" + isLoading)
            setIsLoading(true)
        }
    }
    const history = useHistory();
    return (
        <div>
            <div className="top_header">
                <h1>きりみんちゃん掲示板</h1>
            </div>
            <CreateNewThread updateListener={updateListener} />
            <div className="top_threads_header">
                <h2>スレッド一覧</h2>
            </div>
            {
                threads.map((item: ThreadModel) => (
                    <div className="top_thread_sumally_parent" onClick={() => history.push('/thread/' + item.threadId) }>
                        <ThreadSumally key={item.threadId} thread={item} />
                    </div>
                ))
            }
      </div>
    );
  }