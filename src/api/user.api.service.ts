import {AppStateType} from '../state/state.context';

export default class UserApiService {

  readonly STORAGE_PATH: string = '/users';
  readonly TOKEN: string = '';
  readonly USER_ID: string = '';

  public clearToken = () => {};

  constructor(appState: AppStateType) {
    this.TOKEN = appState.getToken();
    this.USER_ID = appState.getUserId();
    this.clearToken = () => appState.clearToken();
  }

  public getCurrentProfile(): Promise<any> {
    return fetch(this.STORAGE_PATH + '/' + this.USER_ID, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
    }).then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          return data;
        }

        if(data.statusCode === 401){
          this.clearToken();
        }

        return {
          message: 'No current user!'
        };
      });
  }

  public attachDocument(docId: string){
    return fetch(this.STORAGE_PATH + '/attach', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
      body: JSON.stringify({docId, userId: this.USER_ID})
    }).then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          return data;
        }

        if(data.statusCode === 401){
          this.clearToken();
        }

        return {
          message: 'Attach document operation is failed!'
        };
      })
  }
}
