import { CommentModel } from './CommentModel';

export type ThreadModel = {
  threadId: number;
  title: string;
  createdAt: string;
  updatedAt: string;
  createdUserId: number;
  createdUserName: string;
  comments: Array<CommentModel>;
};
