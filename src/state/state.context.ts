import React, {useContext} from "react";

export function getDefaultState() {
  let isAuthenticated = false;
  let token = '';

  const setAuth = (value: boolean): void => {
    isAuthenticated = value;
  }

  const getAuth = (): boolean => {
    return isAuthenticated;
  }

  const setToken = (value: string): void => {
    token = value;
  }

  const getToken = (): string => {
    return token;
  }

  return {
    setAuth,
    getAuth,
    setToken,
    getToken,
  };
}

export const AppStateContext = React.createContext(getDefaultState());
export type AppStateType = ReturnType<typeof getDefaultState>;

export function useAppState(): AppStateType {
  return useContext(AppStateContext);
}
