import React from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './app.component.scss';
import NavigationComponent from "./navigation.component";
import GeneratorComponent from "./template-generator/generator.component";
import TemplateListComponent from "./template-list/template-list.component";
import DocumentComponent from "./document/document.component";
import DocumentListComponent from "./document-list/document-list.component";
import LoginComponent from "./login/login.component";


function AppComponent() {
  const links = [
    {to: '/create-template', title: 'Create template'},
    {to: '/templates', title: 'Templates'},
    {to: '/documents', title: 'Documents'},
    {to: '/login', title: 'Login'},
  ];

  return (
    <Router>

      <Switch>
        <Route path="/login"><LoginComponent/></Route>
        <Route path="/">
          <NavigationComponent links={links}/>

          <Switch>
            <Route path="/create-template"><GeneratorComponent/></Route>
            <Route path="/templates"><TemplateListComponent/></Route>
            <Route path="/documents/:id"><DocumentComponent/></Route>
            <Route path="/documents"><DocumentListComponent/></Route>
            <Route path="/login"><LoginComponent/></Route>
          </Switch>
        </Route>
      </Switch>
    </Router>
  );
}

export default AppComponent;
