import * as React from "react";
import { ThreadSumally } from "./ThreadSumally"
import { CreateNewThread } from "./CreateNewThread"
import Axios from "axios";
import './Top.css'

export const Top: React.FC = () => {
    const [threads, setThreads] = React.useState<any>( []);
  
    React.useEffect(() => {
        (async function load() {
            const result = await Axios(
                'http://localhost:8080/thread/list'
            );
            setThreads(result.data);
        })()
    }, []);

    return (
        <div>
            <div className="top_header">
                <h1>きりみんちゃん掲示板</h1>
            </div>
            <CreateNewThread />
            <div className="top_threads_header">
                <h2>スレッド一覧</h2>
            </div>
            {
                threads.map((item: { title: string, threadId: number }) => (
                    <div className="top_thread_sumally_parent">
                        <ThreadSumally key={item.threadId} title={item.threadId + ":" + item.title}/>
                    </div>
                ))
            }
      </div>
    );
  }