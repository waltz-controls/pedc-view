import React from 'react';
import {Button, Card, H1, H3, H4, Intent} from "@blueprintjs/core";
import './document-list.component.scss';
import DocumentApiService from "../../api/document.api.service";
import {useHistory} from "react-router-dom";
import {ListApiServiceType} from "../../api/list.api.service";


export default function DocumentListComponent() {
  const api = new DocumentApiService(ListApiServiceType.DOCUMENT);
  const history = useHistory();

  const documents = api.findAll();

  return (
    <>
      <div className="templates-container">
        <H3>Documents</H3>

        {documents.map((doc: any, index: number) => (
          <Card key={index} className="templates-block">
            <H4>{doc.id} - Some document title</H4>

            <Button
              intent={Intent.NONE}
              onClick={() => history.push(`/document/${doc.id}`)}
            >
              See document
            </Button>

            &nbsp;

            <Button
              intent={Intent.DANGER}
              onClick={() => {
                api.removeOne(doc.id);
                history.push('/documents');
              }}
            >
              Remove document
            </Button>
          </Card>
        ))}
      </div>
    </>
  );
}
