import React, {useState} from 'react';
import './generator.component.scss';
import LibraryComponent from "./library.component";
import TemplateGeneratorComponent from "./template-generator.component";
import {ComponentType, LibraryComponentType} from "../../types";
import TemplateApiService from "../../api/template.api.service";
import {ListApiServiceType} from "../../api/list.api.service";
import ComponentService from "../../services/component.service";

function getAllComponents(): any[] {
  return [
    LibraryComponentType.TEXT_INPUT,
    LibraryComponentType.FILE_INPUT,
    LibraryComponentType.CHECKBOX,
    LibraryComponentType.SWITCH,
    LibraryComponentType.NUMERIC_INPUT,
    LibraryComponentType.TAG_INPUT,
    LibraryComponentType.RADIO_GROUP,
    LibraryComponentType.SLIDER,
    LibraryComponentType.TEXTAREA,
    LibraryComponentType.IMAGE
  ].map((type) => {
    return {
      type,
      instance: ComponentService.getInstanceByType(type),
      props: ComponentService.getDefaultPropsByType(type),
      fields: ComponentService.getConfigurationFieldsByType(type)
    }
  });
}

export default function GeneratorComponent() {
  const api = new TemplateApiService(ListApiServiceType.TEMPLATE);
  const [items, setItems] = useState<ComponentType[]>([]);
  const components = getAllComponents();

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
