import * as React from "react";
import './Comment.css'

export const Comment: React.FC<{
    text: string
}> = ({text}) => {
    const [count, setCount] = React.useState(0);
  
    return (
      <div className="comment_parent">
        <p className="comment_header">きりみんちゃん id:00001 2020/04/10 21:00</p>
        <p className="comment_text">{text}</p>
      </div>
    );
  }