import React, {useEffect, useState} from 'react';
import './template-list.component.scss';
import TemplateApiService from "../../api/template.api.service";
import {Button, Card, ControlGroup, H3, H4, InputGroup, Intent, Spinner} from '@blueprintjs/core';
import {useHistory} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {ListApiServiceType} from "../../api/list.api.service";


export default function TemplateListComponent() {
  const [isPending, setPending] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [documentTitle, setDocumentTitle] = useState<string>('');
  const history = useHistory();

  const templateApi = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const documentApi = new DocumentApiService(ListApiServiceType.DOCUMENT);

  useEffect(() => {
    templateApi.findAll().then((templates) => {
      setPending(false);
      setTemplates(templates);
    });
  }, [isPending]);

  return (
    <div className="templates-container">
      <H3>Templates:</H3>

      {isPending && (
        <div className={"templates-spinner"}>
          <Spinner size={50}/>
        </div>
      )}

      {!isPending && <div className={"templates-input"}>
        <InputGroup
          placeholder={"Document title"}
          value={documentTitle}
          onChange={(e: any) => setDocumentTitle(e.target.value)}
        />
      </div>}

      {!isPending && templates.map((template: any, index: number) => (
        <Card key={index} className="templates-block">
          <H4>{template._id} - {template.title}</H4>

          <ControlGroup>
            <Button
              small
              intent={Intent.PRIMARY}
              disabled={!Boolean(documentTitle)}
              onClick={() => {
                documentApi
                  .insertOne(documentTitle, template.blocks)
                  .then((document) => {
                    console.log('Document created:', document._id, documentTitle);
                    history.push(`/documents/${document._id}`);
                  });
              }}
            >
              Create document
            </Button>

            <Button
              small
              intent={Intent.DANGER}
              onClick={() => {
                setPending(true);
                templateApi.removeOne(template._id).then(() => {
                  console.log('Template removed:', template._id, template.title);
                });
              }}
            >
              Remove template
            </Button>
          </ControlGroup>
        </Card>
      ))}
    </div>
  );
}
