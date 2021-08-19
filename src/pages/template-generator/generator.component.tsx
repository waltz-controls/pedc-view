import React, {useState} from 'react';
import './generator.component.scss';
import LibraryComponent from "./library/library.component";
import TemplateGeneratorComponent from "./template-generator.component";
import {ComponentType} from "types";
import TemplateApiService from "api/template.api.service";
import {ListApiServiceType} from "api/list.api.service";
import {useAppState} from "state/state.context";
import PagesComponent from "../../shared/pages.component";


export default function GeneratorComponent() {
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

            setItems(items.concat(selectedItem));
          }}
        />
      </div>

      <div className="generator-document">

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
