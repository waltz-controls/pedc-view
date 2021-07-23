import React, {useState} from 'react';
import './generator.component.scss';
import LibraryComponent from "./library.component";
import TemplateGeneratorComponent from "./template-generator.component";
import {ComponentType} from "../../types";
import TemplateApiService from "../../api/template.api.service";
import {ListApiServiceType} from "../../api/list.api.service";
import ComponentService from "../../services/component.service";


export default function GeneratorComponent() {
  const api = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const [items, setItems] = useState<ComponentType[]>([]);
  const components = ComponentService.getAllComponentsForLibrary();

  return (
    <div className="generator-container">
      <div className="generator-library">
        <LibraryComponent
          select={(value: ComponentType) => setItems(items.concat(value))}
          components={components}
        />
      </div>
      <div className="generator-document">
        <TemplateGeneratorComponent
          blocks={items}
          saveDocument={(title: string) => {
            api.insertOne(title, items);
          }}
          clearDocument={() => setItems([])}
        />
      </div>
    </div>
  );
}
