import { ApiInterface } from './ApiInterface';

export async function createNewComment(
  threadId: number,
  createdUserId: number,
  text: string
): Promise<any> {
  return await new ApiInterface().postRequest('api/createNewComment', {
    threadId,
    createdUserId,
    text,
  });
}

export async function deleteComment(
  commentId: number,
  userId: number
): Promise<any> {
  return await new ApiInterface().postRequest('api/deleteComment', {
    commentId,
    userId,
  });
}
