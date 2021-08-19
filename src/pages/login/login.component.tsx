import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Intent, NonIdealState,} from "@blueprintjs/core";

import AuthApiService from "api/auth.api.service";
import {TextInputComponent} from "components/text-input.component";
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
    <div>
      <div style={{width: 300, margin: "50px auto"}}>

        <TextInputComponent
          label={'Username'}
          value={username}
          onChange={(v) => setUsername(v)}
        />

        <TextInputComponent
          label={'Password'}
          value={password}
          onChange={(v) => setPassword(v)}
        />

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
    </div>
  );
}
