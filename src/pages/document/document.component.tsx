import React, {useEffect, useState} from 'react';
import {Button, H3, Intent,} from "@blueprintjs/core";
import {ComponentType, LibraryComponentType} from "../../types";
import './document.component.scss';
import {useHistory, useParams} from 'react-router-dom';
import DocumentApiService from "../../api/document.api.service";
import {ListApiServiceType} from "../../api/list.api.service";
import ComponentService from "../../services/component.service";


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
  const api = new DocumentApiService(ListApiServiceType.DOCUMENT);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [initialMaxPage, setInitialMaxPage] = useState<number>(1);
  const [document, setDocument] = useState<any>({blocks: []});
  const [isPending, setPending] = useState<any>(true);
  const [blocks, setBlocks] = useState<ComponentType[]>([]);

  // document
  useEffect(() => {
    api.findOne(params.id).then((document) => {
      const initialMaxPage = getDocumentMaxPage(document.blocks);

      setDocument(document);
      setInitialMaxPage(initialMaxPage);
      setPending(false);
    });
  }, [isPending]);

  // blocks
  useEffect(() => {
    const documentBlocks = document.blocks.map((component: ComponentType) => {
      return {
        ...component,
        instance: ComponentService.getInstanceByType(component.type)
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

                    // TODO - refactor components with files

                    if (_block.type === LibraryComponentType.FILE_INPUT) {
                      _block.props.file = value;
                    } else if (_block.type === LibraryComponentType.IMAGE) {
                      _block.props.file = value;
                    } else if (_block.type === LibraryComponentType.GALLERY) {
                      _block.props.files = value;
                    } else {
                      _block.props.value = value;
                    }
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
