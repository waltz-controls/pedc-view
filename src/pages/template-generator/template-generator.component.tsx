import React from 'react';
import './generator.component.scss';
import {Button, ButtonGroup, Callout, H3, Intent} from "@blueprintjs/core";
import {ComponentType} from "../../types";
import './template-generator.component.scss';
import RenderService from "../../services/render.service";

type TemplateComponentProps = {
  blocks: ComponentType[];
  saveDocument(): void;
  clearDocument(): void;
}

export default function TemplateGeneratorComponent(props: TemplateComponentProps) {

  function renderBlocks(blocks: ComponentType[]): any {
    return blocks.map((component: ComponentType) => RenderService.renderBlock(component))
  }

  const blocks = renderBlocks(props.blocks);

  return (
    <>
      <H3>Document Template</H3>

      <Callout className={'template-control'}>
        <ButtonGroup fill>
          <Button intent={Intent.PRIMARY} onClick={() => {
            props.saveDocument();
            props.clearDocument();
          }}>
            Create
          </Button>
          <Button intent={Intent.DANGER} onClick={props.clearDocument}>
            Clear
          </Button>
        </ButtonGroup>
      </Callout>

      <div className={"template-container"}>
        {blocks.map((block: any, index: number) => (
          <div key={index} className={"template-block"}>{block}</div>
        ))}
      </div>
    </>
  );
}
