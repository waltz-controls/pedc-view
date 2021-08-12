import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import AppComponent from './pages/app.component';
import reportWebVitals from './reportWebVitals';

import {FocusStyleManager} from "@blueprintjs/core";
import {AppStateContext, getDefaultState} from './state/state.context';

FocusStyleManager.onlyShowFocusOnTabs();

ReactDOM.render(
  <React.StrictMode>
    <AppStateContext.Provider
      value={getDefaultState()}
    >
      <AppComponent/>
    </AppStateContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
