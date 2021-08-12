import React, {useEffect, useState} from 'react';
import './generator.component.scss';
import LibraryComponent from "./library.component";
import TemplateGeneratorComponent from "./template-generator.component";
import {ComponentType} from "../../types";
import TemplateApiService from "../../api/template.api.service";
import {ListApiServiceType} from "../../api/list.api.service";
import ComponentService from "../../services/component.service";
import {Button, Intent} from "@blueprintjs/core";
import {useAppState} from "../../state/state.context";


export default function GeneratorComponent() {
  const appState = useAppState();
  const api = new TemplateApiService(ListApiServiceType.TEMPLATE, appState);
  const [items, setItems] = useState<ComponentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);
  const components = ComponentService.getAllComponentsForLibrary();

  const pages = Array.from(Array(maxPage).keys()).map((value) => {
    const index = value + 1;
    const intent = index === currentPage ? Intent.PRIMARY : Intent.NONE;

    return (
      <Button
        minimal
        key={index}
        intent={intent}
        onClick={() => setCurrentPage(index)}
      >{index}
      </Button>
    );
  });

  const blocks = items.filter((item) => item.page === currentPage);

  return (
    <div className="generator-container">
      <div className="generator-library">
        <LibraryComponent
          select={(_component: ComponentType) => {
            setItems([...items, {
              ..._component,
              page: currentPage,
            }]);
          }}
          components={components}
        />
      </div>
      <div className="generator-document">
        <div>
          <Button
            minimal
            onClick={() => {
              setMaxPage(maxPage + 1);
              setCurrentPage(maxPage + 1);
            }}
          >
            Add page
          </Button>

          <Button
            minimal
            disabled={maxPage < 2}
            onClick={() => {
              const updatedMaxPage = maxPage - 1;
              const updatedItems = items.filter((item) => item.page && item.page <= updatedMaxPage);

              setItems(updatedItems);
              setMaxPage(updatedMaxPage);
              setCurrentPage(updatedMaxPage);
            }}>
            Delete page
          </Button>

          <div>
            {pages}
          </div>
        </div>

        <br/>

        <TemplateGeneratorComponent
          blocks={blocks}
          saveDocument={(title: string) => {
            const updatedItems = items.map((item, index: number) => {
              item.id = index;

              return item;
            });

            api.insertOne(title, updatedItems).then(() => {
              console.log('Template created:', title);
            });
          }}
          clearDocument={() => setItems([])}
        />
      </div>
    </div>
  );
}
