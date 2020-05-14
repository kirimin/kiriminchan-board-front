import { ApiInterface } from './ApiInterface';

export async function getThreadSummary(): Promise<any> {
  return await new ApiInterface().getRequest('api/getThreadsSumally');
}

export async function getThreadDetail(id: string): Promise<any> {
  return await new ApiInterface().getRequest('api/getThreadDetail/' + id);
}

export async function createNewThread(
  createdUserId: number,
  title: string,
  text: string
): Promise<any> {
  return await new ApiInterface().postRequest('api/createNewThread', {
    createdUserId,
    title,
    text,
  });
}

export async function deleteThread(
  threadId: number,
  userId: number
): Promise<any> {
  return await new ApiInterface().postRequest('api/deleteThread', {
    threadId,
    userId,
  });
}
