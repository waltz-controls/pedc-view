import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, FormGroup, InputGroup, Intent, NonIdealState,} from "@blueprintjs/core";
import "./login.component.scss";

import AuthApiService from "api/auth.api.service";
import {useAppState} from "state/state.context";

export default function LoginComponent(): any {
  const api = new AuthApiService();
  const history = useHistory();
  const appState = useAppState();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setError] = useState('');
  const [isAuth, setAuthStatus] = useState(appState.getAuth());

  const processLogin = () => {
    api
      .login(username, password)
      .then((response) => {
        if (response.isSuccessful) {
          appState.setAuth(true);
          appState.setToken(response.access_token || '');
          setAuthStatus(true);
          setError('');
        } else {
          setError(response.message);
        }
      });
  }

  useEffect(() => {
    if (isAuth) {
      history.push('/');
    }
  }, [isAuth]);

  return (
    <div className={"login-container"}>

      <FormGroup label={'Username'}>
        <InputGroup
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </FormGroup>

      <FormGroup label={'Password'}>
        <InputGroup
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </FormGroup>

      <br/>

      <Button
        fill
        intent={Intent.PRIMARY}
        onClick={processLogin}
      >Login</Button>

      <br/>

      {errorText && <NonIdealState
        icon="error"
        title={errorText}
      />}
    </div>
  );
}
