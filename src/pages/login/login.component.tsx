import React, {useEffect, useState} from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Colors, FormGroup, H1, H4, H6, InputGroup, Intent} from "@blueprintjs/core";
import {ReactComponent as Logo} from './logo.svg';
import "./login.component.scss";

import AuthApiService from "api/auth.api.service";
import {useAppState} from "state/state.context";


function getRedirectLocation(location: any): string {
  const pathname = location?.state?.from?.pathname || '';
  const search = location?.state?.from?.search || '';

  if(!pathname && !search){
    return '/';
  }

  return pathname + search;
}


export default function LoginComponent(): any {
  const api = new AuthApiService();
  const history = useHistory();
  const appState = useAppState();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setError] = useState('');

  const processLogin = () => {
    api
      .login(username, password)
      .then((response) => {
        if (response.isSuccessful) {
          appState.setToken(response.access_token || '');
          appState.setUserId(response.userId || '');
          appState.setUserRole(response.role || '');
          setError('');
          history.push(getRedirectLocation(location));
        } else {
          setError(response.message);
        }
      });
  }

  useEffect(() => {
    if (Boolean(appState.getToken())) {
      history.push(getRedirectLocation(location));
    }
  });

  return (
    <div
      className={"login-container"}
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          processLogin();
        }
      }}
    >

      <div className="login-logo">
        <Logo/>
      </div>

      <div className="login-form">

        <H1 className={'login-form-title'}>PEDC</H1>
        <H4 className={'login-form-desc'}>Pre Experiment Data Collector</H4>

        <br/>
        <br/>

        <FormGroup label={'Username'}>
          <InputGroup
            onChange={(e) => setUsername(e.target.value)}
            value={username}
          />
        </FormGroup>

        <FormGroup label={'Password'}>
          <InputGroup
            onChange={(e) => setPassword(e.target.value)}
            type={"password"}
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

        {errorText && <H6 style={{color: Colors.RED5}}>Error: {errorText}</H6>}

      </div>
    </div>
  );
}
