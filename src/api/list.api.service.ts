import {AppStateType} from "state/state.context";

export enum ListApiServiceType {
  TEMPLATE = '/templates',
  DOCUMENT = '/documents'
}

export default class ListApiService {

  readonly STORAGE_PATH: string;
  readonly TOKEN: string;

  private clearToken = () => {}

  constructor(key: string, appState: AppStateType) {
    this.STORAGE_PATH = key;
    this.TOKEN = appState.getToken();
    this.clearToken = () => appState.setAuth(false);
  }

  public insertOne(title: string, blocks: any[]): Promise<any> {
    return fetch(this.STORAGE_PATH, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
      body: JSON.stringify({
        title,
        blocks
      })
    }).then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          return data;
        }

        this.clearToken();

        return {
          title: "",
          _id: "",
          blocks: []
        };
      })
  }

  public findOne(id: string): Promise<any> {
    return fetch(this.STORAGE_PATH + '/' + id, {
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

        this.clearToken();

        return {
          title: "",
          _id: "",
          blocks: []
        }
      });
  }

  public findAll(): Promise<any[]> {
    return fetch(this.STORAGE_PATH, {
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

        this.clearToken();

        return [];
      });
  }

  public removeOne(id: string): Promise<any[]> {
    return fetch(this.STORAGE_PATH + '/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
    }).then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          return data;
        }

        this.clearToken();

        return [];
      });
  }

  public updateOne(id: string, data: any): Promise<any> {
    return fetch(this.STORAGE_PATH + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
      body: JSON.stringify(data)
    }).then((response) => response.json())
      .then((data) => {
        if (!data.statusCode) {
          return data;
        }

        this.clearToken();

        return false;
      });
  }
}
