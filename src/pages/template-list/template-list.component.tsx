import React, {useEffect, useState} from 'react';
import './template-list.component.scss';
import TemplateApiService from "../../api/template.api.service";
import {Button, Card, H3, H4, Intent, Spinner} from '@blueprintjs/core';
import {useHistory} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {ListApiServiceType} from "../../api/list.api.service";


export default function TemplateListComponent() {
  const [isPending, setPending] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const history = useHistory();

  const templateApi = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const documentApi = new DocumentApiService(ListApiServiceType.DOCUMENT);

  useEffect(() => {
    templateApi.findAll().then((templates ) => {
      setPending(false);
      setTemplates(templates);
    });
  }, [isPending]);

  return (
    <div className="templates-container">
      <H3>Templates:</H3>

      {isPending && (
        <div className={"templates-spinner"}>
          <Spinner size={50} />
        </div>
      )}

      {!isPending && templates.map((template: any, index: number) => (
        <Card key={index} className="templates-block">
          <H4>{template.id} - {template.title}</H4>

          <Button
            intent={Intent.PRIMARY}
            onClick={() => {
              const id = documentApi.insertOne(template.blocks);
              history.push(`/document/${id}`);
            }}
          >
            Create document
          </Button>

          &nbsp;

          <Button
            intent={Intent.DANGER}
            onClick={() => {
              setPending(true);
              templateApi.removeOne(template.id);
            }}
          >
            Remove template
          </Button>
        </Card>
      ))}
    </div>
  );
}
