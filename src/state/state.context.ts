import React, {useContext} from "react";

const TOKEN_KEY = 'PEDC-TOKEN';
const USER_ID_KEY = 'PEDC-USER-ID';
const USER_ROLE_KEY = 'PEDC-USER-ROLE';

export function getDefaultState() {
  const getSetFunc = (token: string) => (value: string) => localStorage.setItem(token, value);
  const getGetFunc = (token: string) => () => localStorage.getItem(token) || '';

  return {
    setToken: getSetFunc(TOKEN_KEY),
    getToken: getGetFunc(TOKEN_KEY),
    setUserId: getSetFunc(USER_ID_KEY),
    getUserId: getGetFunc(USER_ID_KEY),
    setUserRole: getSetFunc(USER_ROLE_KEY),
    getUserRole: getGetFunc(USER_ROLE_KEY),
    clearAll: () => {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem(USER_ID_KEY);
      localStorage.removeItem(USER_ROLE_KEY);
    }
  };
}

export const AppStateContext = React.createContext(getDefaultState());
export type AppStateType = ReturnType<typeof getDefaultState>;

export function useAppState(): AppStateType {
  return useContext(AppStateContext);
}
