import React, {useState} from 'react';
import './template-generator.component.scss';
import LibraryComponent from "./library/library.component";
import TemplateComponent from "./template/template.component";
import {ComponentType} from "types";
import TemplateApiService from "api/template.api.service";
import {ListApiServiceType} from "api/list.api.service";
import {useAppState} from "state/state.context";
import PagesComponent from "shared/pages.component";
import { v1 as getId } from 'uuid';


export default function TemplateGeneratorComponent() {
  const appState = useAppState();
  const api = new TemplateApiService(ListApiServiceType.TEMPLATE, appState);
  const [items, setItems] = useState<ComponentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const blocks = items.filter((item) => item.page === currentPage);

  return (
    <div className="generator-container">
      <div className="generator-library">
        <LibraryComponent
          select={(_component: ComponentType) => {
            const selectedItem = {
              ..._component,
              page: currentPage,
            };

            const updatedItems = items.concat(selectedItem).map((item, index) => {
              item.id = getId();

              return item;
            });

            setItems(updatedItems);
          }}
        />
      </div>

      <div className="generator-document">

        <TemplateComponent
          blocks={blocks}
          saveDocument={(title: string) => {
            api.insertOne(title, items).then(() => {
              console.log('Template created:', title);
            });
          }}
          clearDocument={() => setItems([])}
          deleteBlock={(id: string) => {
            const updatedItems = items.filter((item) => {
              return id !== item.id;
            });

            setItems(updatedItems);
          }}
        >

          <PagesComponent
            currentPage={currentPage}
            maxPage={maxPage}
            addPage={() => {
              setMaxPage(maxPage + 1);
              setCurrentPage(maxPage + 1);
            }}
            selectPage={(index) => setCurrentPage(index)}
            deletePage={() => {
              const updatedMaxPage = maxPage - 1;
              const updatedItems = items.filter((item) => item.page && item.page <= updatedMaxPage);

              setItems(updatedItems);
              setMaxPage(updatedMaxPage);
              setCurrentPage(updatedMaxPage);
            }}
          />

        </TemplateComponent>
      </div>
    </div>
  );
}
