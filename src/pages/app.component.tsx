import React, {useEffect} from 'react';
import {Route, BrowserRouter as Router, Switch} from 'react-router-dom';
import './app.component.scss';
import NavigationComponent from "./navigation.component";
import GeneratorComponent from "./template-generator/generator.component";
import TemplateListComponent from "./template-list/template-list.component";
import DocumentComponent from "./document/document.component";
import DocumentListComponent from "./document-list/document-list.component";
import {H3} from "@blueprintjs/core";


function AppComponent() {
  const links = [
    {to: '/create-template', title: 'Create template'},
    {to: '/templates', title: 'Templates'},
    {to: '/documents', title: 'Documents'},
    {to: '/', title: 'Home'},
  ];

  return (
    <Router>
      <NavigationComponent links={links}/>

      <Switch>
        <Route path="/create-template"><GeneratorComponent/></Route>
        <Route path="/templates"><TemplateListComponent/></Route>
        <Route path="/documents/:id"><DocumentComponent/></Route>
        <Route path="/documents"><DocumentListComponent/></Route>
        <Route path="/">
          <div style={{padding: 20}}>
            <H3>Welcome!</H3>
          </div>
        </Route>
      </Switch>
    </Router>
  );
}

export default AppComponent;
