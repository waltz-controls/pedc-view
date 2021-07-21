import React, {useEffect, useState} from 'react';
import {Button, Card, H3, H4, Intent, Spinner} from "@blueprintjs/core";
import './document-list.component.scss';
import DocumentApiService from "../../api/document.api.service";
import {useHistory} from "react-router-dom";
import {ListApiServiceType} from "../../api/list.api.service";


export default function DocumentListComponent() {
  const [isPending, setPending] = useState(true);
  const [documents, setDocuments] = useState<any>([]);
  const history = useHistory();
  const api = new DocumentApiService(ListApiServiceType.DOCUMENT);

  useEffect(() => {
    api.findAll().then((documents) => {
      setPending(false);
      setDocuments(documents);
    });
  }, [isPending]);

  return (
    <>
      <div className="documents-container">
        <H3>Documents</H3>

        {isPending && (
          <div className={"documents-spinner"}>
          <Spinner size={50} />
          </div>
        )}

        {!isPending && documents.map((doc: any, index: number) => (
          <Card key={index} className="documents-block">
            <H4>{doc.id} - {doc.title}</H4>

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
                setPending(true);
                api.removeOne(doc.id);
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
