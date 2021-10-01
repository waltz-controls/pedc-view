import React, {useEffect, useState} from 'react';
import {Button, FormGroup, H3, InputGroup, Intent, Spinner} from '@blueprintjs/core';
import {useHistory} from 'react-router-dom';
import './template-list.component.scss';
import TemplateApiService from "api/template.api.service";
import DocumentApiService from "api/document.api.service";
import {useAppState} from "state/state.context";
import ListComponent from "../../components/list.component";


export default function TemplateListComponent() {
  const [isPending, setPending] = useState(true);
  const [templates, setTemplates] = useState<any[]>([]);
  const [documentTitle, setDocumentTitle] = useState<any>('');
  const [selectedTemplate, selectTemplate] = useState<any>(null);
  const history = useHistory();
  const appState = useAppState();

  const templateApi = new TemplateApiService(appState);
  const documentApi = new DocumentApiService(appState);

  useEffect(() => {
    templateApi.findAll().then((templates) => {
      setPending(false);
      setTemplates(templates);
    });
  }, [isPending]);

  const createDocument = (title: string, template: any) => {
    documentApi
      .insertOne(title, template.blocks)
      .then((document) => {
        console.log('Document created:', document._id, title);
        history.push(`/documents/${document._id}`);
      });
  }

  const removeTemplate = (template: any) => {
    setPending(true);
    templateApi.removeOne(template._id).then(() => {
      console.log('Template removed:', template._id, template.title);
      selectTemplate(null);
    });
  }

  if (isPending) {
    return (
      <div className="templates-list">
        <H3>Choose template:</H3>
        <div className={"templates-list__spinner"}>
          <Spinner size={50}/>
        </div>
      </div>
    )
  }

  return (
    <div className="templates-list">

      <H3>Choose template:</H3>

      <br/>

      <div className="templates-list__container">

        <div className={"list-container"}>
          <ListComponent
            items={templates}
            selectItem={(item) => selectTemplate(item)}
            selectedItem={selectedTemplate}
          />
        </div>

        {selectedTemplate && <div className={"form-container"}>

          <H3>Create document</H3>

          <br/>

          <FormGroup label={"Document title"}>
            <InputGroup
              value={documentTitle}
              onChange={(e: any) => setDocumentTitle(e.target.value)}
            />
          </FormGroup>

          <FormGroup label={"Selected template"}>
            <InputGroup
              value={selectedTemplate?.title}
              disabled
            />
          </FormGroup>

          <br/>

          <Button
            fill
            intent={Intent.PRIMARY}
            disabled={!Boolean(documentTitle)}
            onClick={() => createDocument(documentTitle, selectedTemplate)}
          >
            Create document
          </Button>

          <br/>

          <Button
            fill
            intent={Intent.DANGER}
            onClick={() => removeTemplate(selectedTemplate)}
          >
            Delete template
          </Button>
        </div>}
      </div>
    </div>
  );
}
