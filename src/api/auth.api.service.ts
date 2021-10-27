import {USER_ROLE} from '../types';

export default class AuthApiService {

  readonly STORAGE_PATH = '';

  public login(username: string, password: string): Promise<{
    access_token?: string;
    isSuccessful: boolean;
    userId: string;
    role: USER_ROLE;
    message: string;
  }> {
    return fetch(this.STORAGE_PATH + '/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      })
    }).then((response) => {
      return response.json();
    }).then((response) => {
      const isSuccessful = Boolean(response.access_token);

      return {...response, isSuccessful};
    });
  }
}
