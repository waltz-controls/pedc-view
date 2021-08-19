import React, {useState} from 'react';
import {Button, ButtonGroup, Callout, H3, Icon, Intent} from "@blueprintjs/core";
import './template.component.scss';
import {ComponentType} from "types";
import {TextInputComponent} from "components/text-input.component";

type TemplateComponentProps = {
  blocks: ComponentType[];
  saveDocument(title: string): void;
  clearDocument(): void;
  deleteBlock(id: string): void;
  children: any;
}

export default function TemplateComponent(props: TemplateComponentProps) {
  const [title, setTitle] = useState('');

  return (
    <>
      <H3>Document Template</H3>

      <Callout className={'template-control'}>

        <TextInputComponent
          placeholder={"Template title"}
          value={title}
          onChange={(value) => setTitle(value)}
        />

        <ButtonGroup fill>
          <Button
            intent={Intent.PRIMARY}
            disabled={!Boolean(title)}
            onClick={() => {
              props.saveDocument(title);
              props.clearDocument();
            }}
          >
            Create
          </Button>
          <Button intent={Intent.DANGER} onClick={props.clearDocument}>
            Clear
          </Button>
        </ButtonGroup>
      </Callout>

      {props.children}

      <div className={"template-container"}>
        {props.blocks.map((block: any, index) => (
          <div key={index} className={"template-block"}>
            <div className={"template-block-instance"}>
              <block.instance {...block.props} />
            </div>
            <div className={"template-block-remove"}>
              <Button
                icon={"remove"}
                minimal
                intent={Intent.DANGER}
                onClick={() => props.deleteBlock(block.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
