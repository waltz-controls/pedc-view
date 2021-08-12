export enum ListApiServiceType {
  TEMPLATE = 'http://localhost:3000/templates',
  DOCUMENT = 'http://localhost:3000/documents'
}

export default class ListApiService {

  readonly STORAGE_PATH: string;
  readonly TOKEN: string;

  constructor(key: string, token: string) {
    this.STORAGE_PATH = key;
    this.TOKEN = token;
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

        return {
          title: "",
          _id: "",
          blocks: []
        }
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
    }).then((response) => response.json());
  }

  public updateOne(id: string, data: any): Promise<any> {
    return fetch(this.STORAGE_PATH + '/' + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.TOKEN,
      },
      body: JSON.stringify(data)
    }).then((response) => response.json());
  }
}
