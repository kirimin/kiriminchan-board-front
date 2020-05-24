import Axios from 'axios';
import { firebaseApp } from '../firebase';

export class ApiInterface {
  private domain = 'https://kiriminchan-board-backend.herokuapp.com/';
  // private domain = 'http://localhost:8080/';

  async getRequest(api: string): Promise<any> {
    const domain = this.domain;
    return Axios(domain + api);
  }

  async postRequest(api: string, body: any): Promise<any> {
    const domain = this.domain;
    body['token'] = await firebaseApp.auth().currentUser!.getIdToken(true);
    return await Axios.post(domain + api, body);
  }
}
