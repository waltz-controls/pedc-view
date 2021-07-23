import React from 'react';
import './library.component.scss';
import {Callout, Card, H3,} from "@blueprintjs/core";
import {ComponentType} from "../../types";
import ConfigurationComponent from "./configuration.component";


type LibraryComponentProps = {
  select(value: ComponentType): void;
  components: ComponentType[];
};

export default function LibraryComponent(props: LibraryComponentProps) {
  return (
    <>
      <H3>Components library</H3>

      <div className={"library-list"}>
        {props.components.map((component: any, index) => (
          <Card
            key={index}
            className="library-item"
            interactive
          >
            <ConfigurationComponent
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
