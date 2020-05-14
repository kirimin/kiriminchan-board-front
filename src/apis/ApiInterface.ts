import Axios from 'axios';
import { firebaseApp } from '../firebase';

export class ApiInterface {
  private domain = 'http://localhost:8080/';

  async getRequest(api: string): Promise<any> {
    const domain = this.domain;
    return await Axios(domain + api);
  }

  async postRequest(api: string, body: any): Promise<any> {
    const domain = this.domain;
    const token = await firebaseApp.auth().currentUser!.getIdToken();
    body['token'] = token;
    return await Axios.post(domain + api, body);
  }
}
