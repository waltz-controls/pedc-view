import React from 'react';
import './library.component.scss';
import {
  Callout,
  Card,
  H3,
} from "@blueprintjs/core";
import {ComponentType, LibraryComponentType} from "../../types";
import ComponentService from "../../services/component.service";

type LibraryComponentProps = {
  select(value: ComponentType): void
};

function getAllComponents(): any[] {
  return [
    LibraryComponentType.FILE_INPUT,
    LibraryComponentType.CHECKBOX,
    LibraryComponentType.SWITCH,
    LibraryComponentType.NUMERIC_INPUT,
    LibraryComponentType.TAG_INPUT,
    LibraryComponentType.RADIO_GROUP,
    LibraryComponentType.SLIDER,
  ].map((type) => {
    return {
      type,
      instance: ComponentService.getInstanceByType(type),
      props: ComponentService.getDefaultPropsByType(type)
    }
  });
}

export default function LibraryComponent(props: LibraryComponentProps) {

  const components = getAllComponents();

  return (
    <>
      <H3>Components library</H3>

      <Callout className={'library-desc'}>
        Click on the component to add to the document template...
      </Callout>

      <div className={"library-list"}>
        {components.map((component: ComponentType, index) => (
          <Card
            key={index}
            className="library-list-item"
            interactive
            onClick={() => props.select(component)}
          >
            <component.instance
              {...component.props}
              onClick={(e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
            </component.instance>
          </Card>
        ))}
      </div>
    </>
  );
}
