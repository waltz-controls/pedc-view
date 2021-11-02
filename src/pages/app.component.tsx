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
  const USER_ROLES_ONLY = [USER_ROLE.USER];
  const SCIENTIST_ROLES_ONLY = [USER_ROLE.SCIENTIST];
  const BOTH_ROLES = [USER_ROLE.USER, USER_ROLE.SCIENTIST];

  return (
    <Router>
      <Switch>

        {/* The routes order is important. Be careful! */}

        <Route path="/login"><LoginComponent/></Route>

        <PrivateRoute path="/">
          <NavigationComponent links={[
            {to: '/create-template', title: 'Create template', roles: SCIENTIST_ROLES_ONLY},
            {to: '/templates', title: 'Templates',  roles: SCIENTIST_ROLES_ONLY},
            {to: '/documents', title: 'Documents', roles: BOTH_ROLES},
          ]}/>

          <Switch>
            <PrivateRoute path="/create-template" roles={SCIENTIST_ROLES_ONLY}>
              <TemplateGeneratorComponent/>
            </PrivateRoute>

            <PrivateRoute path="/templates" roles={SCIENTIST_ROLES_ONLY}>
              <TemplateListComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents/attach" roles={USER_ROLES_ONLY}>
              <AttachDocument/>
            </PrivateRoute>

            <PrivateRoute path="/documents/:id" roles={BOTH_ROLES}>
              <DocumentComponent/>
            </PrivateRoute>

            <PrivateRoute path="/documents" roles={BOTH_ROLES}>
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
