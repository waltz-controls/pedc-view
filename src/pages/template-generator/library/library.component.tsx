import React from 'react';
import {Card, H3,} from "@blueprintjs/core";
import './library.component.scss';
import LibraryItemComponent from "./library-item.component";
import {ComponentType} from "types";
import BlockService from "blocks/block.service";


type LibraryComponentProps = {
  select(value: ComponentType): void;
};

export default function LibraryComponent(props: LibraryComponentProps) {
  const components: ComponentType[] = BlockService.getAllComponentsForLibrary();

  return (
    <>
      <H3>Components library</H3>

      <div className={"library-list"}>
        {components.map((component: any, index) => (
          <Card
            key={index}
            className="library-item"
            interactive
          >
            <LibraryItemComponent
              component={component}
              fields={component.fields}
              onAdd={(component: ComponentType) => {
                props.select(component);
              }}
            />
          </Card>
        ))}
      </div>
    </>
  );
}
