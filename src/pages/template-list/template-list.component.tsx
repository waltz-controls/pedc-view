import React from 'react';
import './template-list.component.scss';
import TemplateApiService from "../../api/template.api.service";
import {Button, Card, H3, H4, Intent} from '@blueprintjs/core';
import {useHistory} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {ListApiServiceType} from "../../api/list.api.service";


export default function TemplateListComponent() {
  const history = useHistory();
  const templateApi = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const documentApi = new DocumentApiService(ListApiServiceType.DOCUMENT);

  const documents = templateApi.findAll();

  return (
    <div className="templates-container">
      <H3>Templates:</H3>

      {documents.map((doc: any, index: number) => (
        <Card key={index} className="templates-block">
          <H4>{doc.id} - Some template title</H4>
          <Button
            intent={Intent.PRIMARY}
            onClick={() => {
              const id = documentApi.insertOne(doc.blocks);
              history.push(`/document/${id}`);
            }}
          >
            Create document
          </Button>

          &nbsp;

          <Button
            intent={Intent.DANGER}
            onClick={() => {
              templateApi.removeOne(doc.id);
              history.push(`/templates`);
            }}
          >
            Remove template
          </Button>
        </Card>
      ))}
    </div>
  );
}
