import * as React from "react";
import './Comment.css'
import { CommentModel } from "../models/CommentModel"

export const Comment: React.FC<{
    comment: CommentModel
}> = ({comment}) => {
  
    return (
      <div className="comment_parent">
        <p className="comment_header">{comment.createdUserName} id:{comment.commentId} 投稿：{comment.updatedAt}</p>
    <p className="comment_text">{comment.text}</p>
      </div>
    );
  }