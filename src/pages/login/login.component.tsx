import React, {useState} from 'react';
import {Button, Intent, NonIdealState,} from "@blueprintjs/core";
import AuthApiService from "../../api/auth.api.service";
import {TextInputComponent} from "../../components/text-input.component";
import {useHistory} from "react-router-dom";

export default function LoginComponent() {
  const api = new AuthApiService();
  const history = useHistory();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorText, setError] = useState('');

  function login(_username: string, _password: string): void {
    api
      .login(username, password)
      .then((response) => {
        const isSuccessful = Boolean(response.access_token);

        setError(isSuccessful ? '' : response.message);

        if (isSuccessful) {
          history.push('/');
        }
      });
  }

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
          onClick={() => {
            login(username, password);
          }}
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
