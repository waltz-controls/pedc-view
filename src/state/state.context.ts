import React, {useContext} from "react";

export function getDefaultState(){
  let isAuthenticated = false;

  const setAuth = (value: boolean) => {
    isAuthenticated = value;
  }

  const getAuth = () => {
    return isAuthenticated;
  }

  return {
    setAuth,
    getAuth
  };
}

export const AppStateContext = React.createContext(getDefaultState());
export type GlobalStateContextType = ReturnType<typeof getDefaultState>;

export function useAppState(): GlobalStateContextType {
  return useContext(AppStateContext);
}
