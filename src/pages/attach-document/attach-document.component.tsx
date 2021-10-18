import React from 'react';
import {useHistory, useLocation} from 'react-router-dom';
import {Button, Intent,} from "@blueprintjs/core";
import UserApiService from 'api/user.api.service';
import {useAppState} from "state/state.context";
import './attach-document.component.scss';


export default function AttachDocument() {
  const history = useHistory();
  const location: any = useLocation();
  const appState = useAppState();
  const userApiService = new UserApiService(appState);

  const documentId = location?.state?.docId;
  const userId = appState.getUserId();

  if(documentId){
    return (
      <div className="attach-document-container">
        <p>
          Attach next document <strong>{documentId}</strong> to current user <strong>{userId}</strong>?
        </p>

        <Button
          intent={Intent.PRIMARY}
          text={'Attach document'}
          onClick={() => {
            userApiService.attachDocument(documentId).then(() => {
              history.push('/documents/' + documentId);
            });
          }}
        />
      </div>
    )
  }

  return (
    <div className="attach-document-container">
      <p>
        No document id to attach!
      </p>

      <Button
        intent={Intent.NONE}
        text={'Go to all documents'}
        onClick={() => {
          history.push('/documents/');
        }}
      />
    </div>
  );
}
