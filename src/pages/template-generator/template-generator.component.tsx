import React, {useState} from 'react';
import './template-generator.component.scss';
import LibraryComponent from "./library/library.component";
import TemplateComponent from "./template/template.component";
import {ComponentType} from "types";
import TemplateApiService from "api/template.api.service";
import {useAppState} from "state/state.context";
import PagesComponent from "components/pages.component";
import { v1 as getId } from 'uuid';
import {H3} from "@blueprintjs/core";


export default function TemplateGeneratorComponent() {
  const appState = useAppState();
  const api = new TemplateApiService(appState);
  const [items, setItems] = useState<ComponentType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const blocks = items.filter((item) => item.page === currentPage);

  const deletePagesFromEnd = (limit: number) => {
    const updatedMaxPage = maxPage - limit;
    const updatedItems = items.filter((item) => item.page && item.page <= updatedMaxPage);

    setItems(updatedItems);
    setMaxPage(updatedMaxPage);
    setCurrentPage(updatedMaxPage);
  }

  const deleteAllPages = () => {
    deletePagesFromEnd(maxPage - 1);
    setItems([]);
  }

  const deleteLastPage = () => {
    deletePagesFromEnd(1);
  }

  return (
    <div className="generator-container">
      <div className="generator-library">
        <LibraryComponent
          select={(_component: ComponentType) => {
            const selectedItem = {
              ..._component,
              page: currentPage,
            };

            const updatedItems = items.concat(selectedItem).map((item) => {
              item.id = getId();

              return item;
            });

            setItems(updatedItems);
          }}
        />
      </div>

      <div className="generator-document">

        <H3>Template</H3>

        <TemplateComponent
          blocks={blocks}
          saveDocument={(title: string) => {
            api.insertOne(title, items).then(() => {
              console.log('Template created:', title);
            });
          }}
          clearDocument={() => deleteAllPages()}
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
            deletePage={() => deleteLastPage()}
          />

        </TemplateComponent>
      </div>
    </div>
  );
}
