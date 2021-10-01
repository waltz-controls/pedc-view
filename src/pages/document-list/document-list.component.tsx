import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Card, H3, H4, Intent, Spinner} from "@blueprintjs/core";
import './document-list.component.scss';
import DocumentApiService from "api/document.api.service";
import {useAppState} from "state/state.context";
import ListComponent from "../../components/list.component";
import {CommonItemType} from "../../types";


export default function DocumentListComponent() {
  const [isPending, setPending] = useState(true);
  const [documents, setDocuments] = useState<any>([]);
  const [selectedDocument, selectDocument] = useState<any>(null);

  const history = useHistory();
  const appState = useAppState();
  const api = new DocumentApiService(appState);

  useEffect(() => {
    api.findAll().then((documents) => {
      setPending(false);
      setDocuments(documents);
    });
  }, [isPending]);

  const proceedToDocument = (doc: CommonItemType) => {
    history.push(`/documents/${doc._id}`);
  }

  const removeDocument = (doc: any) => {
    setPending(true);
    selectDocument(null);
    api.removeOne(doc._id).then(() => {
      console.log('Document removed:', doc._id, doc.title);
    });
  }

  if (isPending) {
    return (
      <>
        <div className="documents-list">
          <H3>Documents</H3>

          <div className={"documents-spinner"}>
            <Spinner size={50}/>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className="documents-list">

        <H3>Documents</H3>

        <br/>

        <div className="documents-list__container">
          <div className="list-container">
            <ListComponent
              items={documents}
              selectItem={(item) => selectDocument(item)}
              selectedItem={selectedDocument}
            />
          </div>

          {selectedDocument && <div className="form-container">
            <H4>{selectedDocument.title}</H4>

            <br/>

            <Button
              fill
              intent={Intent.NONE}
              onClick={() => proceedToDocument(selectedDocument)}
            >
              Proceed to document
            </Button>

            &nbsp;

            <Button
              fill
              intent={Intent.DANGER}
              onClick={() => removeDocument(selectedDocument)}
            >
              Remove document
            </Button>
          </div>}
        </div>
      </div>
    </>
  );
}
