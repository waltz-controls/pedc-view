import React, {useContext} from "react";

const TOKEN_KEY = 'PEDC-TOKEN';
const USER_ID_KEY = 'PEDC-USER-ID';

export function getDefaultState() {
  const setToken = (value: string): void => {
    localStorage.setItem(TOKEN_KEY, value);
  }

  const getToken = (): string => {
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  const clearToken = (): void => {
    localStorage.setItem(TOKEN_KEY, '');
    window.location.reload();
  }

  const setUserId = (value: string): void => {
    localStorage.setItem(USER_ID_KEY, value);
  }

  const getUserId = (): string => {
    return localStorage.getItem(USER_ID_KEY) || '';
  }

  const clearUserId = (): void => {
    localStorage.setItem(USER_ID_KEY, '');
    window.location.reload();
  }

  return {
    setToken,
    getToken,
    clearToken,
    setUserId,
    getUserId,
    clearUserId,
  };
}

export const AppStateContext = React.createContext(getDefaultState());
export type AppStateType = ReturnType<typeof getDefaultState>;

export function useAppState(): AppStateType {
  return useContext(AppStateContext);
}
