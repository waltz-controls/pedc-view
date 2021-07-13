import React from 'react';
import './library.component.scss';
import {Callout, Card, H3} from "@blueprintjs/core";
import LibraryService from "../../services/library.service";
import {ComponentType} from "../../types";
import RenderService from "../../services/render.service";

type LibraryComponentProps = {
  select(value: ComponentType): void
};

export default function LibraryComponent(props: LibraryComponentProps) {

  const components = LibraryService.getAllComponents();

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
            {RenderService.renderBlock(component, {
              onClick: (e: React.MouseEvent<HTMLElement>) => {
                e.preventDefault();
                e.stopPropagation();
              }
            })}
          </Card>
        ))}
      </div>
    </>
  );
}
