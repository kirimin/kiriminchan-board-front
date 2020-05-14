import { ApiInterface } from './ApiInterface';

export async function getUser(uid: string): Promise<any> {
  return await new ApiInterface().getRequest('api/getUser/' + uid);
}

export async function createNewUser(
  name: string,
  firebaseUid: string
): Promise<any> {
  return await new ApiInterface().postRequest('api/createNewUser', {
    name,
    firebaseUid,
  });
}

export async function updateUserToken(
  uid: string,
  token: string
): Promise<any> {
  return await new ApiInterface().postRequest('api/updateUserToken', {
    uid,
    token,
  });
}

export async function deleteUser(userId: number): Promise<any> {
  return await new ApiInterface().postRequest('api/deleteUser', {
    userId,
  });
}
