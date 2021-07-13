import React, {useState} from 'react';
import './generator.component.scss';
import LibraryComponent from "./library.component";
import TemplateGeneratorComponent from "./template-generator.component";
import {ComponentType} from "../../types";
import TemplateApiService from "../../api/template.api.service";
import {ListApiServiceType} from "../../api/list.api.service";


export default function GeneratorComponent() {
  const api = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const [items, setItems] = useState<ComponentType[]>([]);

  return (
    <div className="generator-container">
      <div className="generator-library">
        <LibraryComponent select={(value: ComponentType) => setItems(items.concat(value))}/>
      </div>
      <div className="generator-document">
        <TemplateGeneratorComponent
          blocks={items}
          saveDocument={() => api.insertOne(items)}
          clearDocument={() => setItems([])}
        />
      </div>
    </div>
  );
}
