import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './app.component.scss';
import NavigationComponent from './navigation.component';
import TemplateGeneratorComponent from './template-generator/template-generator.component';
import TemplateListComponent from './template-list/template-list.component';
import DocumentComponent from './document/document.component';
import DocumentListComponent from './document-list/document-list.component';
import LoginComponent from './login/login.component';
import PrivateRoute from 'components/private-route.component';
import {Callout, Intent} from '@blueprintjs/core';
import AttachDocument from './attach-document/attach-document.component';
import {USER_ROLE} from '../types';


function AppComponent() {
  return (
    <Router>
      <Switch>

        {/* The routes order is important. Be careful! */}

        <Route path="/login"><LoginComponent/></Route>

        <PrivateRoute path="/">
          <NavigationComponent links={[
            {to: '/create-template', title: 'Create template', role: USER_ROLE.SCIENTIST},
            {to: '/templates', title: 'Templates',  role: USER_ROLE.SCIENTIST},
            {to: '/documents', title: 'Documents', role: USER_ROLE.USER},
          ]}/>

          <Switch>
            <PrivateRoute path="/create-template" role={USER_ROLE.SCIENTIST}>
              <TemplateGeneratorComponent/>
            </PrivateRoute>

            <PrivateRoute path="/templates" role={USER_ROLE.SCIENTIST}>
              <TemplateListComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents/attach" role={USER_ROLE.USER}>
              <AttachDocument/>
            </PrivateRoute>

            <PrivateRoute path="/documents/:id" role={USER_ROLE.USER}>
              <DocumentComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents" role={USER_ROLE.USER}>
              <DocumentListComponent/>
            </PrivateRoute>

            <Route path="/">
              <Callout
                intent={Intent.SUCCESS}
                icon={false}
                title={"How to work with PEDC:"}
                className={'how-to-work'}
              >
                <div>
                  <strong>Create Template</strong> - You can create a template according to which documents will be created
                </div>
                <div>
                  <strong>Templates</strong> - List of templates created. You can create a document from the selected template. Or delete the template itself.
                </div>
                <div>
                  <strong>Documents</strong> - List of documents to be filled in with data.
                </div>
              </Callout>
            </Route>
          </Switch>
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

export default AppComponent;
