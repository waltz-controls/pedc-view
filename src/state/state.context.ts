import React, {useContext} from "react";

const TOKEN_KEY = 'PEDC-TOKEN';

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

  return {
    setToken,
    getToken,
    clearToken,
  };
}

export const AppStateContext = React.createContext(getDefaultState());
export type AppStateType = ReturnType<typeof getDefaultState>;

export function useAppState(): AppStateType {
  return useContext(AppStateContext);
}
