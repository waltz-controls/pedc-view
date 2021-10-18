import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {Button, H3, Intent,} from "@blueprintjs/core";

import './document.component.scss';
import {ComponentType, LibraryComponentType} from "types";
import DocumentApiService from "api/document.api.service";
import BlockService from "blocks/block.service";
import {useAppState} from "state/state.context";


function getDocumentMaxPage(blocks: any): number {
  return blocks
    .map((block: any) => block.page)
    .sort()
    .pop();
}

function getPagesConfiguration(_current: number, _limit: number): any[] {
  return Array.from(Array(_limit), (v, idx) => {
    const index = idx + 1;
    const intent = index === _current ? Intent.PRIMARY : Intent.NONE;

    return {
      index,
      intent
    }
  });
}

export default function DocumentComponent() {
  const params: any = useParams();
  const history = useHistory();
  const appState = useAppState();
  const api = new DocumentApiService(appState);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [initialMaxPage, setInitialMaxPage] = useState<number>(1);
  const [document, setDocument] = useState<any>({blocks: []});
  const [isPending, setPending] = useState<any>(true);
  const [blocks, setBlocks] = useState<ComponentType[]>([]);

  // document
  useEffect(() => {
    api.findOne(params.id).then((_document) => {
      const initialMaxPage = getDocumentMaxPage(_document.blocks);

      setDocument(_document);
      setInitialMaxPage(initialMaxPage);
      setPending(false);
    });
  }, [isPending]);

  // blocks
  useEffect(() => {
    const documentBlocks = document.blocks.map((component: ComponentType) => {
      return {
        ...component,
        instance: BlockService.getInstanceByType(component.type)
      };
    });

    setBlocks(documentBlocks);
  }, [document, currentPage])

  const pages = getPagesConfiguration(currentPage, initialMaxPage);

  const filteredBlocks = blocks.filter((block: ComponentType) => block.page === currentPage)

  return (
    <div className={"item-container"}>
      <H3>{document._id} - {document.title}</H3>

      {isPending && 'pending...'}

      <div>
        {pages.map((page) => {
          return (
            <Button
              minimal
              key={page.index}
              intent={page.intent}
              onClick={() => setCurrentPage(page.index)}
            >{page.index}
            </Button>
          )
        })}
      </div>

      <br/>

      <form>
        {filteredBlocks.map((block: ComponentType) => (
          <div
            key={block.id}
            className={"item-block"}
          >
            <block.instance
              {...block.props}
              onChange={(value: any) => {
                const updatedBlocks = blocks.map((_block) => {
                  if (_block.id === block.id) {
                    _block.props.value = value;
                  }

                  return _block;
                });

                setBlocks(updatedBlocks);
              }}
            />
          </div>
        ))}

        <Button
          intent={Intent.NONE}
          text={'Go back'}
          onClick={() => history.push('/documents')}
        />

        &nbsp;

        <Button
          intent={Intent.PRIMARY}
          text={'Update document'}
          onClick={() => {
            api.updateOne(document._id, {blocks}).then(() => {
              console.log('Document updated:', document._id, document.title);
            })
          }}
        />

      </form>
    </div>
  );
}
