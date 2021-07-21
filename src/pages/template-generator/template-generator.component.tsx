import React, {useState} from 'react';
import './generator.component.scss';
import {Button, ButtonGroup, Callout, H3, Intent} from "@blueprintjs/core";
import {ComponentType} from "../../types";
import './template-generator.component.scss';
import {TextInputComponent} from "../../components/text-input.component";

type TemplateComponentProps = {
  blocks: ComponentType[];
  saveDocument(title: string): void;
  clearDocument(): void;
}

export default function TemplateGeneratorComponent(props: TemplateComponentProps) {
  const [title, setTitle] = useState('');

  const blocks = props.blocks.map((component: ComponentType) => (
    <component.instance {...component.props} />
  ));

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

      <div className={"template-container"}>
        {blocks.map((block: any, index: number) => (
          <div key={index} className={"template-block"}>{block}</div>
        ))}
      </div>
    </>
  );
}
