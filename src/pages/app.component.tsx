import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './app.component.scss';
import NavigationComponent from "./navigation.component";
import GeneratorComponent from "./template-generator/generator.component";
import TemplateListComponent from "./template-list/template-list.component";
import DocumentComponent from "./document/document.component";
import DocumentListComponent from "./document-list/document-list.component";
import LoginComponent from "./login/login.component";
import PrivateRoute from "./auth/private-route.component";


function AppComponent() {
  const links = [
    {to: '/create-template', title: 'Create template'},
    {to: '/templates', title: 'Templates'},
    {to: '/documents', title: 'Documents'},
  ];

  return (
    <Router>

      <Switch>
        <Route path="/login"><LoginComponent/></Route>
        <Route path="/">
          <NavigationComponent links={links}/>

          <Switch>
            <PrivateRoute path="/create-template">
              <GeneratorComponent/>
            </PrivateRoute>

            <PrivateRoute path="/templates">
              <TemplateListComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents/:id">
              <DocumentComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents">
              <DocumentListComponent/>
            </PrivateRoute>

            {/*<Route path="/login"><LoginComponent/></Route>*/}
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default AppComponent;
