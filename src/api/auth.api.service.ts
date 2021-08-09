export default class AuthApiService {

  readonly STORAGE_PATH = 'http://localhost:3000';
  readonly LOCAL_STORAGE_KEY = 'pedc-access-token';

  public login(username: string, password: string): Promise<any> {
    return fetch(this.STORAGE_PATH + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password
      })
    }).then((response) => {
      return response.json();
    });
  }

  public getProfile(token: string): Promise<any> {
    return fetch(this.STORAGE_PATH + '/profile', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
      }
    }).then((response) => {
      return response.json();
    })
  }

  public getToken(): string {
    return localStorage.getItem(this.LOCAL_STORAGE_KEY) || '';
  }

  public saveToken(token: string): void {
    localStorage.setItem(this.LOCAL_STORAGE_KEY, token);
  }

  public clearToken() {
    localStorage.removeItem(this.LOCAL_STORAGE_KEY);
  }
}
