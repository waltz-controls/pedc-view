import React, {useState} from 'react';
import {Button, ButtonGroup, FormGroup, InputGroup, Intent} from "@blueprintjs/core";
import './template.component.scss';
import {ComponentType} from "types";

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
      <ButtonGroup fill>
        <Button
          intent={Intent.PRIMARY}
          disabled={!Boolean(title)}
          onClick={() => {
            props.saveDocument(title);
            props.clearDocument();
          }}
        >
          Create template
        </Button>
        <Button intent={Intent.DANGER} onClick={() => {
          props.clearDocument();
          setTitle('');
        }}>
          Reset template
        </Button>
      </ButtonGroup>

      <br/>

      <FormGroup label={'Title'}>
        <InputGroup
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
      </FormGroup>

      {/* Pagination from parent component */}
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
