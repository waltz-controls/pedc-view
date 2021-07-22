import React, {useState} from "react";
import {ComponentType, LibraryComponentType} from "../../types";
import ComponentService from "../../services/component.service";
import {Button, ButtonGroup, Collapse, H4, H5, H6} from "@blueprintjs/core";
import './configuration.component.scss';

function preventComponentInteraction(e: React.MouseEvent<HTMLElement>): void {
  e.preventDefault();
  e.stopPropagation();
}

function ButtonGroupComponent(props: {
  leftButtonText: string;
  leftButtonAction(): void;
  rightButtonText: string;
  rightButtonAction(): void;
}) {
  return (
    <ButtonGroup fill>
      <Button onClick={props.leftButtonAction}>
        {props.leftButtonText}
      </Button>
      <Button onClick={props.rightButtonAction}>
        {props.rightButtonText}
      </Button>
    </ButtonGroup>
  )
}

type ConfigurationComponentProps = {
  component: ComponentType;
  fields: Array<{
    type: LibraryComponentType;
    props: any;
    key: string;
    instance?: any;
  }>;
  onAdd(value: ComponentType): void;
}

export default function ConfigurationComponent(props: ConfigurationComponentProps) {
  const [customProps, setCustomProps] = useState(props.component.props);
  const [showFields, setShowFields] = useState(true);

  return (
    <>
      <div className={"configuration-component"}>
        <div
          className={"library-item__component"}
          onMouseDown={preventComponentInteraction}
          onClick={preventComponentInteraction}
        >
          <props.component.instance
            {...customProps}
            onClick={preventComponentInteraction}
          >
          </props.component.instance>
        </div>
      </div>

      <div className={"configuration-fields"}>
        <H6>Settings</H6>

        <form>
          {showFields && props.fields.map((field, index) => {

            const _instance = ComponentService.getInstanceByType(field.type);
            const _value = customProps[field.key] || props.component.props.value || field.props.value;

            return (
              <_instance
                {...field.props}
                key={field.key}
                value={_value}
                onChange={(value: any) => {
                  if (field.type === LibraryComponentType.TAG_INPUT && value) {
                    value = value.map((_value: any) => ({label: _value, value: _value}));
                  }

                  setCustomProps({
                    ...customProps,
                    [field.key]: value
                  });
                }}
              />
            );
          })}
        </form>
      </div>

      <div className={"configuration-control"}>
        <ButtonGroupComponent
          leftButtonText={'Add component'}
          leftButtonAction={() => {
            const updatedComponent = {
              ...props.component,
              props: {...props.component.props, ...customProps}
            };

            props.onAdd(updatedComponent);
          }}
          rightButtonText={'Reset fields'}
          rightButtonAction={() => {
            const updatedProps = props.fields.reduce((acc: any, field: any) => {
              acc[field.key] = props.component.props[field.key];

              return acc;
            }, {});

            setCustomProps(updatedProps);

            // workaround for state clearing, need rethink
            setShowFields(false);
            setTimeout(() => setShowFields(true), 0);
          }}
        />
      </div>
    </>
  );
}
